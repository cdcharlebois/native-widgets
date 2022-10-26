// This file was generated by Mendix Studio Pro.
//
// WARNING: Only the following code will be retained when actions are regenerated:
// - the import list
// - the code between BEGIN USER CODE and END USER CODE
// - the code between BEGIN EXTRA CODE and END EXTRA CODE
// Other code you write will be lost the next time you deploy the project.
import { Platform } from "react-native";
import RNBlobUtil from "react-native-blob-util";
import FileViewer from "react-native-file-viewer";
import mimeTypes from "mime";

// BEGIN EXTRA CODE
function formatPath(...pathArgs: string[]): string {
    return pathArgs.filter(arg => !!arg).join("/");
}

function sanitizeFileName(name: string) {
    /* eslint-disable-next-line no-control-regex */
    return name.replace(/[<>"?:|*/\\\u0000-\u001F\u007F]/g, "_");
}

async function getUniqueFilePath(path: string, fileName: string) {
    const insertionIndex = fileName.lastIndexOf(".");
    const fileNameWithoutExtension = fileName.substring(0, insertionIndex);
    const extension = fileName.substring(insertionIndex);

    let uniqueFilePath = formatPath(path, fileName);
    let version = 0;

    while (await RNBlobUtil.fs.exists(uniqueFilePath)) {
        uniqueFilePath = formatPath(path, `${fileNameWithoutExtension} (${++version})${extension}`);
    }

    return uniqueFilePath;
}

// END EXTRA CODE

/**
 * @param {MxObject} file
 * @param {boolean} openWithOS - Set to True to let the OS open the file and ask the user with which applciation.\nSet to False if the file only needs to be saved to the device storage.
 * @returns {Promise.<void>}
 */

export async function DownloadFile(file: mendix.lib.MxObject, openWithOS: boolean) {
    // BEGIN USER CODE
    if (!file) {
        return Promise.reject(new Error("Input parameter 'file' is required"));
    }

    const dirs = RNBlobUtil.fs.dirs;
    const fileName = file.get("Name") as string;
    const mimeType = mimeTypes.getType(fileName);
    const sanitizedFileName = sanitizeFileName(fileName);
    const baseDir = Platform.OS === "ios" ? dirs.DocumentDir : dirs.DownloadDir;
    const filePath = mx.data.getDocumentUrl(file.getGuid(), Number(file.get("changedDate")));
    let accessiblePath;
    if (Platform.OS === "ios") {
        accessiblePath = await getUniqueFilePath(baseDir, sanitizedFileName);
        await RNBlobUtil.fs.cp(filePath, accessiblePath);
    } else {
        accessiblePath = await RNBlobUtil.MediaCollection.copyToMediaStore(
            {
                name: sanitizedFileName,
                mimeType: mimeType ?? "*",
                parentFolder: ""
            },
            "Download",
            filePath
        );
    }
    if (openWithOS) {
        await FileViewer.open(accessiblePath, {
            showOpenWithDialog: true,
            showAppsSuggestions: true
        });
    }
    // END USER CODE
}