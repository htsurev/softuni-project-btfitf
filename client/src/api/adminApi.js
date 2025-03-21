import { useCallback, useEffect, useState } from "react";
import request from "../utils/request";
import useAuth from "../hooks/useAuth";
import { UserContext } from "../contexts/UserContext";

const baseUrl = "http://localhost:3030/data";

export const useCreate = (storagePath) => {
    const { request } = useAuth()

    const create = async (dataDetails) => {
        try {
            await request.post(`${baseUrl}/${storagePath}`, dataDetails);
        } catch (error) {
            console.error("Error creating data:", error);
        }
    };

    return { create };
}

export const useGetOne = (storagePath, dataId) => {
    const [getOne, setGetOne] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await request.get(`${baseUrl}/${storagePath}/${dataId}`);
                setGetOne(response);
            } catch (error) {
                console.error("Error fetching single data:", error);
            }
        };
        fetchData();
    }, [dataId, storagePath]);

    return { getOne };
}

export const useGetAll = (storagePath) => {
    const [getAll, setGetAll] = useState([]);

    const refreshData = useCallback(() => {
        const fetchData = async () => {
            try {
                const response = await request.get(`${baseUrl}/${storagePath}`);
                setGetAll(response);
            } catch (error) {
                console.error("Error fetching all data:", error);
            }
        };
        fetchData();
    }, [storagePath]);

    useEffect(() => {
        refreshData();
    }, [refreshData]);

    return { getAll, refreshData };
};

export const useEdit = (storagePath) => {
    const { request } = useAuth();

    const edit = async (dataId, dataDetails) => {
        try {
            await request.put(`${baseUrl}/${storagePath}/${dataId}`, { ...dataDetails, _id: dataId });
        } catch (error) {
            console.error("Error editing data:", error);
        }
    };

    return {
        edit,
    }
}

export const useDelete = (storagePath) => {
    const { request } = useAuth();

    const deleteData = async (dataId) => {
        try {
            await request.delete(`${baseUrl}/${storagePath}/${dataId}`);
        } catch (error) {
            console.error("Error deleting data:", error);
        }
    };

    return {
        deleteData,
    }
}

export const useLatestData = (storagePath) => {
    const [latestData, setLatestData] = useState([]);

    useEffect(() => {
        const fetchLatestData = async () => {
            try {
                const searchParams = new URLSearchParams({
                    sortBy: '_createdOn desc',
                    pageSize: 3
                });
                const response = await request.get(`${baseUrl}/${storagePath}?${searchParams.toString()}`);
                setLatestData(response);
            } catch (error) {
                console.error("Error fetching latest data:", error);
            }
        };
        fetchLatestData();
    }, [storagePath]);

    return { latestData };
}

