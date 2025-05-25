export class Timer{
  static sleep = (ms: number = 2000): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };
}