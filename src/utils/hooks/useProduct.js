import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../constants';
import { useLatestAPI } from './useLatestAPI';

export function useProduct(productId) {
    const { ref: apiRef, isLoading: isApiMetadataLoading } = useLatestAPI();
    const [product, setProduct] = useState(() => ({
        product: {},
        fetchingProduct: true,
    }));

    useEffect(() => {
        if (!apiRef || isApiMetadataLoading) {
            return () => { };
        }

        const controller = new AbortController();

        async function getProduct() {
            try {
                setProduct({ product: {}, fetchingProduct: true });
                let product = [];
                const response = await fetch(
                    `${API_BASE_URL}/documents/search?ref=${apiRef}&q=
        %5B%5B%3Ad+%3D+at%28document.id%2C+%22${productId}%22%29+%5D%5D`,
                    {
                        signal: controller.signal,
                    }
                );
                if (response.status === 200) {
                    product = await response.json();
                }
                else {
                    console.log('product response: ', response);
                }

                setProduct({ product, fetchingProduct: false, error: false });
            } catch (err) {
                setProduct({ product: {}, fetchingProduct: false, error: true });
                console.error(err);
            }
        }

        getProduct();

        return () => {
            controller.abort();
        };
    }, [apiRef, isApiMetadataLoading, productId]);

    return product;
}
