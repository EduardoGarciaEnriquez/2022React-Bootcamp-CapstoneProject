import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../constants';
import { useLatestAPI } from './useLatestAPI';

export function useAllProducts() {
    const { ref: apiRef, isLoading: isApiMetadataLoading } = useLatestAPI();
    const [allProducts, setAllProducts] = useState(() => ({
        allProducts: {},
        fetchingAllProducts: true,
    }));

    useEffect(() => {
        if (!apiRef || isApiMetadataLoading) {
            return () => { };
        }

        const controller = new AbortController();

        async function getAllProducts() {
            try {
                setAllProducts({ allProducts: {}, fetchingAllProducts: true });
                let allProducts = [];
                const response = await fetch(
                      `${API_BASE_URL}/documents/search?ref=${apiRef}&q=${encodeURIComponent(
                        '[[at(document.type, "product")]]'
                      )}&lang=en-us&pageSize=88`,
                    {
                        signal: controller.signal,
                    }
                );

                if (response.status === 200) {
                    allProducts = await response.json();
                }
                else {
                    console.log('Products response: ',response);
                }
                
                setAllProducts({ allProducts, fetchingAllProducts: false });
            } catch (err) {
                setAllProducts({ allProducts: {}, fetchingAllProducts: false });
                console.error(err);
            }
        }

        getAllProducts();

        return () => {
            controller.abort();
        };
    }, [apiRef, isApiMetadataLoading]);

    return allProducts;
}
