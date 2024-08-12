import {create} from 'zustand'
import {devtools} from 'zustand/middleware'
import { CryptoCurrency, Pair, CryptoPrice } from './types';
import { getCryptos, fetchCurrentCryptoPrice } from './services/CryptoServices';

type CryptoStore = {
    cryptocurrencies: CryptoCurrency
    result: CryptoPrice
    fetchCryptos: () => Promise<void>
    fetchData: (pair: Pair) => Promise<void>
    loading: boolean
}

export const useCryptoStore = create<CryptoStore>()(devtools((set) => ({

    cryptocurrencies: [],
    result: {} as CryptoPrice,
    loading: false,
    fetchCryptos : async () =>{
        const cryptocurrencies = await getCryptos()
        set(() => ({
            cryptocurrencies
        }))      
    },
    fetchData: async (pair) => { 
        set(() => ({
            loading:true
        }))

        const result = await fetchCurrentCryptoPrice(pair)
       
        set(() => ({
            result,
            loading: false
        }))
    }
})))