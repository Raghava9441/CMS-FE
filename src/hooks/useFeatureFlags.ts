import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

export const useFeatureFlags = () => {
    const featureFlags = useSelector((state: RootState) => state.featureFlags);

    const isFeatureEnabled = (featureName: string): boolean => {
        return featureFlags[featureName] === true;
    };

    return { isFeatureEnabled };
};