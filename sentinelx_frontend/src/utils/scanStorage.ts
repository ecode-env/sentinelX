// Utility functions for managing scan data in localStorage

export interface StoredScan {
  id: string;
  target: string;
  tool: string;
  status: 'queued' | 'running' | 'completed' | 'failed';
  findings_count?: number;
  severity?: 'INFO' | 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  progress?: number;
  created_at: string;
  completed_at?: string;
  result?: any;
}

export const saveScanToStorage = (scan: StoredScan) => {
  try {
    const existing = getScansFromStorage();
    const updated = [scan, ...existing.filter(s => s.id !== scan.id)];
    localStorage.setItem('recentScans', JSON.stringify(updated));
  } catch (error) {
    console.error('Error saving scan to storage:', error);
  }
};

export const getScansFromStorage = (): StoredScan[] => {
  try {
    const stored = localStorage.getItem('recentScans');
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading scans from storage:', error);
    return [];
  }
};

export const getScanFromStorage = (id: string): StoredScan | null => {
  try {
    const scans = getScansFromStorage();
    return scans.find(scan => scan.id === id) || null;
  } catch (error) {
    console.error('Error getting scan from storage:', error);
    return null;
  }
};

export const updateScanInStorage = (id: string, updates: Partial<StoredScan>) => {
  try {
    const scans = getScansFromStorage();
    const index = scans.findIndex(scan => scan.id === id);
    if (index >= 0) {
      scans[index] = { ...scans[index], ...updates };
      localStorage.setItem('recentScans', JSON.stringify(scans));
    }
  } catch (error) {
    console.error('Error updating scan in storage:', error);
  }
};