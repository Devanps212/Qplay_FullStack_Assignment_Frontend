export interface Formats {
  quality: string;
  fileUrl: string;
}

export interface Video {
  _id: string;
  title: string;
  thumbnail: string;
  formats: Formats[];
  segments: Array<{ segmentUrl: string; duration: number }>;
  isActive: boolean;
}