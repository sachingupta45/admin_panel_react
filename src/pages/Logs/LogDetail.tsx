import { useParams } from 'react-router-dom';
import MealDetail from './components/MealDetail';
import DietDetail from './components/DietDetail';
import WaterDetail from './components/WaterDetail';

const LogDetail = () => {
    const { type, id } = useParams();

    if (!id) return null;

    switch (type) {
        case 'meal':
            return <MealDetail id={id} />;
        case 'diet':
            return <DietDetail id={id} />;
        case 'water':
            return <WaterDetail id={id} />;
        default:
            return null;
    }
};

export default LogDetail;
