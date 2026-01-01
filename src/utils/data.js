import data from '../data.json';
import { processAssetPaths } from './paths';

// Process asset paths once at module load
export const processedData = processAssetPaths(data);

