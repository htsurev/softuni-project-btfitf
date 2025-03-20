import { useEffect, useState } from "react";
import request from "../utils/request";
import useAuth from "../hooks/useAuth";

const baseUrl = "http://localhost:3030/data";

export const useCreate = (storagePath) => {
    const { request } = useAuth()

    const create = (dataDetails) =>
        request.post(`${baseUrl}/${storagePath}`, dataDetails);

    return { create };
}

export const useGetOne = (storagePath, dataId) => {
    const [getOne, setGetOne] = useState({});

    useEffect(() => {
        request.get(`${baseUrl}/${storagePath}/${dataId}`)
            .then(setGetOne)
    }, [dataId, storagePath]);

    return { getOne };
}

export const useGetAll = (storagePath) => {
    const [getAll, setGetAll] = useState([]);

    useEffect(() => {
        request.get(`${baseUrl}/${storagePath}`)
            .then(setGetAll)
    }, [storagePath]);

    return { getAll };

}

export const useEdit = (storagePath) => {
    const { request } = useAuth();

    const edit = (dataId, dataDetails) =>
        request.put(`${baseUrl}/${storagePath}/${dataId}`, { ...dataDetails, _id: dataId });
console.log(edit);

    return {
        edit,
    }
}

export const useDelete = (storagePath) => {
    const { request } = useAuth();

    const deleteData = (dataId) =>
        request.delete(`${baseUrl}/${storagePath}/${dataId}`);

    return {
        deleteData,
    }
}