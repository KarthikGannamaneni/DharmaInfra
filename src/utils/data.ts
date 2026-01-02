import data from '../data.json';
import { processAssetPaths } from './paths';
import { AppData } from '../types';

// Process asset paths once at module load
export const processedData: AppData = processAssetPaths(data as unknown as AppData);
