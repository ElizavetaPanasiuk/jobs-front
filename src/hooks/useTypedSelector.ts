import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { CommonStoreType } from './../typing/types/storeTypes';

const useTypedSelector: TypedUseSelectorHook<CommonStoreType> = useSelector;

export default useTypedSelector;
