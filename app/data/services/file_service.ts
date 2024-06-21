import * as FileSystem from "expo-file-system";

class FileService {
  saveDataToFile = async (
    directory: string,
    fileName: string,
    data: string
  ) => {
    if (!fileName) {
      throw new Error("file name cannot be invalid");
    }
    const path = `${FileSystem.cacheDirectory}${directory ?? ""}${fileName}`;
    await FileSystem.makeDirectoryAsync(
      `${FileSystem.cacheDirectory}${directory}`,
      {
        intermediates: true,
      }
    );
    await FileSystem.writeAsStringAsync(path, data, {
      encoding: FileSystem.EncodingType.UTF8,
    });
  };

  readDataFromFile = async (directory: string, fileName: string) => {
    if (!fileName) {
      throw new Error("file name cannot be invalid");
    }
    const path = `${FileSystem.cacheDirectory}${directory}${fileName}`;
    return await FileSystem.readAsStringAsync(path, {
      encoding: FileSystem.EncodingType.UTF8,
    });
  };
}

const fileService = new FileService();
export default fileService;
