import { showToast } from "./toast.utils";

export type Module = {
  title: string;
  duration: number;
};

export const featureComingSoon = () => {
  showToast("info", "This feature is coming soon", "Stay tuned!");
};

export const formatSeconds = (remainingTime: number): string => {
  const remainingSeconds = remainingTime % 60;
  const formattedSeconds = remainingSeconds;

  if (remainingTime > 3600) {
    const hours = Math.floor(remainingTime / 3600).toString().padStart(2, "0");
    const minutes = Math.floor((remainingTime % 3600) / 60).toString().padStart(2, "0");
    const seconds = remainingTime % 60
    return `${hours}:${minutes}:${seconds.toString().padStart(2, "0")}`
  }
  if (remainingTime > 60) {
    const minutes = Math.floor(remainingTime / 60);
    return `${minutes}:${formattedSeconds.toString().padStart(2, "0")}`;
  }
  return `${formattedSeconds}`;
}

export const formatSecondsString = (remainingTime: number): string => {
  const remainingSeconds = remainingTime % 60;
  const formattedSeconds = remainingSeconds;

  if (remainingTime > 3600) {
    const hours = Math.floor(remainingTime / 3600).toString().padStart(2, "0");
    const minutes = Math.floor((remainingTime % 3600) / 60).toString().padStart(2, "0");
    const seconds = remainingTime % 60
    return `${hours}h ${minutes}m ${seconds.toString().padStart(2, "0")}s`;
  }
  if (remainingTime > 60) {
    const minutes = Math.floor(remainingTime / 60);
    return `${minutes}m ${formattedSeconds.toString().padStart(2, "0")}s`;
  }
  return `${formattedSeconds}s`;
}

export const formatSecondsHome = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = remainingSeconds > 0 ? remainingSeconds.toString().padStart(2, '0') : '';

  return `${formattedHours !== "00" ? formattedHours + 'h' : ''}${formattedMinutes !== "00" ? formattedMinutes + 'm' : ''}${formattedSeconds !== "00" ? formattedSeconds + 's' : ''}`;
}