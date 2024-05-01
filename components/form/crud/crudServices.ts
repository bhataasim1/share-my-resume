export class CrudServices {
  baseUrl: string;
  registerEndpoint: string;

  constructor() {
    this.baseUrl = "/api";
    this.registerEndpoint = "/register";
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

  async read(path: string) {
    try {
      const response = await fetch(`${this.baseUrl}/${path}`);
      if (response.ok) {
        return response.json();
      } else {
        console.error("Error reading data:", response.statusText);
        return {
          error: "Error reading data",
        };
      }
    } catch (error) {
      console.error("Error reading data:", error);
      return {
        error: "Error reading data",
      };
    }
  }

  async update(data: any, path: string) {
    try {
      const response = await fetch(`${this.baseUrl}/${path}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
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

  async delete(path: string) {
    try {
      const response = await fetch(`${this.baseUrl}/${path}`, {
        method: "DELETE",
      });
      if (response.ok) {
        return response.json();
      } else {
        console.error("Error deleting data:", response.statusText);
        return {
          error: "Error deleting data",
        };
      }
    } catch (error) {
      console.error("Error deleting data:", error);
      return {
        error: "Error deleting data",
      };
    }
  }
}
