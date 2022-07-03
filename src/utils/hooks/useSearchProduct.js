import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../constants';
import { useLatestAPI } from './useLatestAPI';

export function useSearchProduct(searchTerm) {
    const { ref: apiRef, isLoading: isApiMetadataLoading } = useLatestAPI();
    const [searchProduct, setSearchProduct] = useState(() => ({
        searchProduct: {},
        fetchingSearchProduct: true,
    }));

    useEffect(() => {
        if (!apiRef || isApiMetadataLoading) {
            return () => { };
        }

        const controller = new AbortController();

        async function getSearchProduct() {
            try {
                setSearchProduct({ searchProduct: {}, fetchingSearchProduct: true });
                let searchProduct = [];
                const response = await fetch(
                    `${API_BASE_URL}/documents/search?ref=${apiRef}&q=
                    %5B%5Bat(document.type%2C%20%22product%22)%5D%5D&q=
                    %5B%5Bfulltext(document%2C%20%22${searchTerm}%22)
                    %5D%5D&lang=en-us&pageSize=20`,
                    {
                        signal: controller.signal,
                    }
                );
                if (response.status === 200) {
                    searchProduct = await response.json();
                }
                else {
                    console.log('product response: ', response);
                }

                setSearchProduct({ searchProduct, fetchingSearchProduct: false, error: false });
            } catch (err) {
                setSearchProduct({ searchProduct: {}, fetchingSearchProduct: false, error: true });
                console.error(err);
            }
        }

        getSearchProduct();

        return () => {
            controller.abort();
        };
    }, [apiRef, isApiMetadataLoading]);

    return searchProduct;
}
