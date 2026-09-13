import { Applicant } from '../types';

export interface DataQualityReport {
  totalScanned: number;
  anomaliesDetected: number;
  flaggedApplicants: {
    applicantId: string;
    applicantName: string;
    company: string;
    issues: string[];
    completenessScore: number;
    recommendedAction: string;
  }[];
}

export class DataQualityAgent {
  async inspectDataset(applicants: Applicant[]): Promise<DataQualityReport> {
    const flagged: DataQualityReport['flaggedApplicants'] = [];

    // Track emails and company/name signatures for potential duplicates
    const emailMap = new Map<string, string>();

    applicants.forEach(app => {
      const issues: string[] = [];

      if (!app.company || app.company.includes('未填寫') || app.company.includes('個人名義')) {
        issues.push('機構名稱缺漏或使用非正式代稱 (Missing Formal Company Entity)');
      }

      if (!app.jobTitle || app.jobTitle.includes('Ninja') || app.jobTitle.length < 2) {
        issues.push('職稱欄位填寫簡略或非標準化專業職稱 (Non-standard Job Title)');
      }

      if (!app.publicProfileUrl) {
        issues.push('缺少公開專業履歷連結 (No verified LinkedIn/GitHub link)');
      }

      if (app.registrationPurpose.length < 15) {
        issues.push('報名交流動機字數過精簡 (Overly brief registration purpose)');
      }

      if (app.email && emailMap.has(app.email)) {
        issues.push(`偵測到與編號 ${emailMap.get(app.email)} 之電子郵件完全一致 (Duplicate Email)`);
      } else if (app.email) {
        emailMap.set(app.email, app.id);
      }

      if (app.dataQualityNotes && app.dataQualityNotes.length > 0) {
        app.dataQualityNotes.forEach(note => {
          if (!issues.includes(note)) issues.push(note);
        });
      }

      if (issues.length > 0 || app.dataCompleteness < 75) {
        flagged.push({
          applicantId: app.id,
          applicantName: app.name,
          company: app.company,
          issues,
          completenessScore: app.dataCompleteness,
          recommendedAction: '建議主辦方透過 Email 或電話人工確認服務機構與出席代表身分，無須直接剔除。'
        });
      }
    });

    return {
      totalScanned: applicants.length,
      anomaliesDetected: flagged.length,
      flaggedApplicants: flagged
    };
  }
}
