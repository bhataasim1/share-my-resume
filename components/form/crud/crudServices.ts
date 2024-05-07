export class CrudServices {
  baseUrl: string;
  registerEndpoint: string;
  updateUserDetailsEndpoint: string;

  constructor() {
    this.baseUrl = "/api";
    this.registerEndpoint = "/register";
    this.updateUserDetailsEndpoint = "/user/profile"; // rename the endpoint later to userEndpoint
  }

  async register(data: any) {
    try {
      const response = await fetch(`${this.baseUrl}${this.registerEndpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        return response.json();
      } else {
        console.error("Error creating data:", response.statusText);
        return {
          error: "Error creating data",
        };
      }
    } catch (error) {
      console.error("Error creating data:", error);
      return {
        error: "Error creating data",
      };
    }
  }

  async updateUserDetails(data: any) {
    try {
      const response = await fetch(
        `${this.baseUrl}/${this.updateUserDetailsEndpoint}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (response.ok) {
        return response.json();
      } else {
        console.error("Error updating data:", response.statusText);
        return {
          error: "Error updating data",
        };
      }
    } catch (error) {
      console.error("Error updating data:", error);
      return {
        error: "Error updating data",
      };
    }
  }

  async updateUserAvatar(formData: FormData) {
    try {
      const avatarFile = formData.get("avatar") as File;

      if (!avatarFile || avatarFile.size === 0) {
        return { error: "No file found" };
      }

      const fileReader = new FileReader();
      const fileContentPromise = new Promise<ArrayBuffer>((resolve, reject) => {
        fileReader.onload = () => {
          resolve(fileReader.result as ArrayBuffer);
        };
        fileReader.onerror = reject;
        fileReader.readAsArrayBuffer(avatarFile);
      });

      const fileContent = await fileContentPromise;
      console.log("File Content = ", fileContent);

      const response = await fetch(
        `${this.baseUrl}/${this.updateUserDetailsEndpoint}`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (response.ok) {
        return response.json();
      } else {
        console.error("Error updating image:", response.statusText);
        return {
          error: "Error updating image",
        };
      }
    } catch (error) {
      console.error("Error updating image:", error);
      return {
        error: "Error updating image",
      };
    }
  }

  async getUserProfile() {
    try {
      const res = await fetch(
        `${this.baseUrl}/${this.updateUserDetailsEndpoint}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.ok) {
        return res.json();
      } else {
        console.error("Error fetching user profile:", res.statusText);
        return {
          error: "Error fetching user profile",
        };
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return {
        error: "Error fetching user profile",
      };
    }
  }
}
