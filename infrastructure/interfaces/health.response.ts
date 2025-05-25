interface HealthTipIcon{
  name: string;
  library: string;
}

export interface HealthTipResponse {
  id: number;
  title: string;
  description: string;
  icon: HealthTipIcon;
}

