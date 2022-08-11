import admin from "firebase-admin";

admin.initializeApp({
  credential: admin.credential.cert({
    type: "service_account",
    project_id: "yotea-7ce13",
    private_key_id: "a23f49071ad2bb409a61435f9e06b90a3550e4c2",
    private_key:
      "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDTKfKJ0II/bR81\nT4JfKYGF6ZEYO50aXBYvq9DYjoYBRThIIXYTumlwfJwEOg5DincgdJPp0AfB4c5K\nPJpYKWjhhg0YR8i97TPTwLvLhPZMgjW+Hk+DBTKil6zGPW0Mro76E+UC6MmdnPrC\nivTv/pXtdpQQpfOzdrQGxMPSgI6088J5u0LdnCTyRn8IU5WMPzR/1AP2vxzlSaJp\nHceCz/jfRfec7PJBaXL3pkyg4zkzGQ2DwsqkZxEJ38XS91g/yAS8L+V0t00mIexU\nGrPozz5qRhYg3OSsiCZCZqWWIuCpQBdbFeeaLdCHqlnfjrQIFVEqnbjZLjcWreHL\nki8EtrJZAgMBAAECggEAJ7GxcX2cFk8teCh/keLsAZ/D0iHWqO9ZjlGGe0bjYta/\nuzNrDk9S5b3O2C6PotujBBtV+LRN2QDY9fSJcPwrxoUb7g4EasttnCcVRi8y23P4\npUnuWWs/Nvg7FrLSTnl7z/+wY4kd6T5qlupnG7woM9DACZcghgJQ2hrf0rCu4s2+\nJZXqhY6oLxzwUqgZixZku9/AanUa00XIPCWIE9FWGemexL4k+ipQKuc5izG4rwb7\nk3zvPMbkdETkzKiw+zpX9AtyuoWHxQ3QOVjhUQ6U7LcFf8r4lSKh4fqCteuXmyMc\njX3cjJ95uinAYg/zhbqyBeNX8lArKeX7R9iHXVWMrwKBgQDzm5zq1jMUPr+sqQTX\nRnWrUB3b0puhmZwSRUIHydA1g7EVuOOZ9F/0x8c7KEl8XPsNl6weU5S04S0R8CSZ\ndb9gbjP0Kv5R9d7whvof4rsf/2rBG4jR6iKBaAY1E9fi7kCW4FR6b8RvMl4TiBIK\n40WoEr2OEgaDCEB/oZemQjuKewKBgQDd59T3nCkpWej6TJjEoJ5D3nDmtfZXaTbw\nnO2K2dVXoPOC0yeN+CpO4G5w/60DgRTqqjHb8HDq34OKeGNPK7bOYE3HdVWlfWKY\nPZuKdLFnTB0gs1IMwHBy/9XCgi7IGk0h2vgTv9cvZ/10fN0EICQ66ma4sTAr9Lgl\nerk6fpLYOwKBgAayvqvOW/UwjICo3RM2QsIFH+0Na24UFTCDav9f0zPFfTcFsGxp\nRcIrRBUiVHLw8446H2duEOawUlbt7XOywyJZpWAPVpLWWdzvOS1rRI3qrfrFUQvE\njlJUk+cdto/s0SXU4T3EmPgdwGx1D1nxSdcHPOMNJ9Sug2d+//Z4V77FAoGAGUhv\nyGJ/ghmfZN1TTpvqTFtMy8yRq7XuL44Btp9JInnRJOfACvnqgCAsFS3cXZjYdEA9\n/AwyIWCkESPUVNHrOypX0lD5GCjoEeZ7EVRoXhea/f3QbGmEpmWlykqg3+W3QhM7\nzqw97UXQ5/PODslGt3u7hnGRxoBUdti7wAFp478CgYAq47AxcDSvKqUS7kWjHgHf\nPJTX6Cyz2FlMMA27ll7IRS4mWy60QdWnXjUW5iEc68frHft4iV9rH9HNfD356+kz\nJXDMyXJb/mxs7y4Lp6OLHu+vPmKV/43Smwlv+gXe/aIl2PIg0xIXSyrihxA5X8oE\nEKNMYK8cytfpodR5dJrzOA==\n-----END PRIVATE KEY-----\n",
    client_email: "firebase-adminsdk-3fw3a@yotea-7ce13.iam.gserviceaccount.com",
    client_id: "116343593906710668063",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
      "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-3fw3a%40yotea-7ce13.iam.gserviceaccount.com",
  }),
});

export default admin;
