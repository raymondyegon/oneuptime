import { AppApiHostname } from "../EnvironmentConfig";
import ClusterKeyAuthorization from "../Middleware/ClusterKeyAuthorization";
import BaseService from "./BaseService";
import EmptyResponseData from "../../Types/API/EmptyResponse";
import HTTPResponse from "../../Types/API/HTTPResponse";
import Protocol from "../../Types/API/Protocol";
import Route from "../../Types/API/Route";
import URL from "../../Types/API/URL";
import TwilioConfig from "../../Types/CallAndSMS/TwilioConfig";
import { JSONObject } from "../../Types/JSON";
import ObjectID from "../../Types/ObjectID";
import SMS from "../../Types/SMS/SMS";
import API from "../../Utils/API";
import CaptureSpan from "../Utils/Telemetry/CaptureSpan";

export class SmsService extends BaseService {
  public constructor() {
    super();
  }

  @CaptureSpan()
  public async sendSms(
    sms: SMS,
    options: {
      projectId?: ObjectID | undefined; // project id for sms log
      isSensitive?: boolean; // if true, message will not be logged
      userOnCallLogTimelineId?: ObjectID;
      customTwilioConfig?: TwilioConfig | undefined;
    },
  ): Promise<HTTPResponse<EmptyResponseData>> {
    const body: JSONObject = {
      to: sms.to.toString(),
      message: sms.message,
      projectId: options.projectId?.toString(),
      isSensitive: options.isSensitive,
      userOnCallLogTimelineId: options.userOnCallLogTimelineId?.toString(),
      customTwilioConfig: options.customTwilioConfig
        ? {
            accountSid: options.customTwilioConfig.accountSid!,
            authToken: options.customTwilioConfig.authToken!,
            primaryPhoneNumber:
              options.customTwilioConfig.primaryPhoneNumber.toString(),
            secondaryPhoneNumbers:
              options.customTwilioConfig.secondaryPhoneNumbers?.toString(),
          }
        : undefined,
    };

    return await API.post<EmptyResponseData>(
      new URL(
        Protocol.HTTP,
        AppApiHostname,
        new Route("/api/notification/sms/send"),
      ),
      body,
      {
        ...ClusterKeyAuthorization.getClusterKeyHeaders(),
      },
    );
  }
}

export default new SmsService();
