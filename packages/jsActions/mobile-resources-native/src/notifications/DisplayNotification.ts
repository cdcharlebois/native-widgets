// This file was generated by Mendix Modeler.
//
// WARNING: Only the following code will be retained when actions are regenerated:
// - the code between BEGIN USER CODE and END USER CODE
// Other code you write will be lost the next time you deploy the project.

import { NativeModules, Platform } from "react-native";
import PushNotification, { PushNotificationObject } from "react-native-push-notification";

/**
 * Displays the specified notification straight away.
 *
 * Note: It is not possible to display a notification whilst the app is in the foreground on iOS 9.
 * @param {string} body - This field is required.
 * @param {string} title
 * @param {string} subtitle
 * @param {boolean} playSound
 * @param {string} actionName
 * @param {string} actionGuid
 * @returns {Promise.<void>}
 */
export async function DisplayNotification(
    body?: string,
    title?: string,
    subtitle?: string,
    playSound?: boolean,
    actionName?: string,
    actionGuid?: string
): Promise<void> {
    // BEGIN USER CODE
    // Documentation https://github.com/zo0r/react-native-push-notification

    const isIOS = Platform.OS === "ios";
    if (NativeModules && isIOS && !NativeModules.RNCPushNotificationIOS) {
        return Promise.reject(new Error("Notifications module is not available in your app"));
    }

    if (!body) {
        return Promise.reject(new Error("Input parameter 'Body' is required"));
    }

    const notification = { message: body } as PushNotificationObject;

    if (!isIOS) {
        const channelId = "mendix-local-notifications";
        const channelExists = await new Promise(resolve =>
            PushNotification.channelExists(channelId, (exists: boolean) => resolve(exists))
        );
        if (!channelExists) {
            const channel = await new Promise(resolve =>
                PushNotification.createChannel(
                    {
                        channelId,
                        channelName: "Local notifications"
                    },
                    created => resolve(created)
                )
            );
            if (!channel) {
                return Promise.reject(new Error("Could not create the local notifications channel"));
            }
        }
        notification.channelId = channelId;
    }

    if (title) {
        notification.title = title;
    }

    if (subtitle && !isIOS) {
        notification.subText = subtitle;
    }

    notification.playSound = !!playSound;

    if (actionName || actionGuid) {
        notification.userInfo = {
            actionName,
            guid: actionGuid
        };
    }

    PushNotification.localNotification(notification);
    return Promise.resolve();
    // END USER CODE
}
