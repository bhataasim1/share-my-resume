interface ApiResponse<T> {
  data?: T;
  error?: string;
}

export class CrudServices {
  private baseUrl: string;
  private userEndpoint: string;
  private userEducationEndpoint: string;

  constructor() {
    this.baseUrl = "/api";
    this.userEndpoint = "/user/profile";
    this.userEducationEndpoint = "/user/education";
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    if (response.ok) {
      return { data: await response.json() };
    } else {
      console.error(`Error: ${response.status} - ${response.statusText}`);
      return { error: "Request failed" };
    }
  }

  private async fetchJson<T>(
    url: string,
    options: RequestInit
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(url, options);
      return this.handleResponse<T>(response);
    } catch (error) {
      console.error("Fetch error:", error);
      return { error: "Network error" };
    }
  }

  async register(data: any): Promise<ApiResponse<any>> {
    const options: RequestInit = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    return this.fetchJson<any>(`${this.baseUrl}/register`, options);
  }

  async updateUserDetails(data: any): Promise<ApiResponse<any>> {
    const options: RequestInit = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    return this.fetchJson<any>(`${this.baseUrl}${this.userEndpoint}`, options);
  }

  async updateUserAvatar(formData: FormData): Promise<ApiResponse<any>> {
    const avatarFile = formData.get("avatar") as File;

    if (!avatarFile || avatarFile.size === 0) {
      return { error: "No file found" };
    }

    if (avatarFile.size > 500000) {
      return { error: "File size is too large" };
    }

    try {
      const fileContent = await this.readFileAsArrayBuffer(avatarFile);
      // console.log("fileContent", fileContent);
      const options: RequestInit = {
        method: "POST",
        body: formData,
      };

      return this.fetchJson<any>(
        `${this.baseUrl}${this.userEndpoint}`,
        options
      );
    } catch (error) {
      console.error("Error updating image:", error);
      return { error: "Error updating image" };
    }
  }

  private readFileAsArrayBuffer(file: File): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        if (fileReader.result instanceof ArrayBuffer) {
          resolve(fileReader.result);
        } else {
          reject(new Error("FileReader result is not an ArrayBuffer"));
        }
      };
      fileReader.onerror = reject;
      fileReader.readAsArrayBuffer(file);
    });
  }

  async getUserProfile(): Promise<ApiResponse<any>> {
    const options: RequestInit = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    return this.fetchJson<any>(`${this.baseUrl}${this.userEndpoint}`, options);
  }

  async createUserEducation(data: any): Promise<ApiResponse<any>> {
    const options: RequestInit = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    return this.fetchJson<any>(
      `${this.baseUrl}${this.userEducationEndpoint}`,
      options
    );
  }
}
