export class AudioManager {
  private masterVolume = 0.7;

  setMasterVolume(volume: number): void {
    this.masterVolume = volume;
  }

  getVolume(): number {
    return this.masterVolume;
  }

  play(eventName: string): void {
    void eventName;
    // MVP scaffold: sound loading hooks live here once assets are added.
  }
}
