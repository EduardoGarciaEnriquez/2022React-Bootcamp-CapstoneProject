import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../constants';
import { useLatestAPI } from './useLatestAPI';

export function useProductsList(page) {
    const { ref: apiRef, isLoading: isApiMetadataLoading } = useLatestAPI();
    const [productsList, setProductsList] = useState(() => ({
        products: {},
        fetchingProducts: true,
    }));

    useEffect(() => {
        if (!apiRef || isApiMetadataLoading) {
            return () => { };
        }

        const controller = new AbortController();

        async function getProductsList() {
            try {
                setProductsList({ products: {}, fetchingProducts: true });
                let products = [];
                const response = await fetch(
                      `${API_BASE_URL}/documents/search?ref=${apiRef}&q=${encodeURIComponent(
                        '[[at(document.type, "product")]]'
                      )}&lang=en-us&pageSize=12&page=${page}`,
                    {
                        signal: controller.signal,
                    }
                );

                if (response.status === 200) {
                    products = await response.json();
                }
                else {
                    console.log('Products response: ',response);
                }
                
                setProductsList({ products, fetchingProducts: false });
            } catch (err) {
                setProductsList({ products: {}, fetchingProducts: false });
                console.error(err);
            }
        }

        getProductsList();

        return () => {
            controller.abort();
        };
    }, [apiRef, isApiMetadataLoading, page]);

    return productsList;
}
