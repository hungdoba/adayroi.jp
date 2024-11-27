export interface CloudImage {
  id: number;
  height: number;
  width: number;
  public_id: string;
  format: string;
  aspect_ratio: number;
  blur_data_url: string;
}

export interface CloudinaryResource {
  height: number;
  width: number;
  aspect_ratio: number;
  public_id: string;
  format: string;
}
