import { CoreData } from './CoreData';
import { computeContainedTerritoryStats, loadTerritoryGDPLiteracy } from './TerritoryData';
import { loadCLDRCoverage } from './UnicodeData';

/**
 * Get more data that is not necessary for the initial page load
 */
export async function loadSupplementalData(coreData: CoreData): Promise<void> {
  if (Object.values(coreData.locales).length == 0) {
    return; // won't load anything while data is empty
  }

  await Promise.all([loadCLDRCoverage(coreData), loadTerritoryGDPLiteracy(coreData.territories)]);

  // 001 is the UN code for the World
  computeContainedTerritoryStats(coreData.territories['001']);
}
