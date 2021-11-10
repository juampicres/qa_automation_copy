import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._

class ENT_91_1 extends Simulation {
    val httpProtocol = http
		.baseUrl("https://voice.staging.anthem.hiper.io")
		.inferHtmlResources()
		.doNotTrackHeader("1")
		.userAgentHeader("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36")
		.wsBaseUrl("wss://voice.staging.anthem.hiper.io")

    val scenario1 = scenario("Signin in and starting engagements")
        .exec(
            http("Sign In")
                .post("/api/users/sign_in")
                .header("accept", "application/json")
		        .header("content-type", "application/json")
                .body(RawFileBody("xsell/voice/signIn_request.json"))
                    .check(status.is(200))
        )

        .exec(flushSessionCookies)  //clear cookies
        .exec(
			http("Create New Engagement")
				.post("/api/v1/test_engage_webhook")
				//.headers(headers_new_engagement)
				.header("x-csrf-token", "jndSc646JNS3ZeXxT3dVJegUWs8UAAzpAcvs13LIpChasNfcC6WcDD5AIe6k3cZkZ2ghzvbJ0DFwLzynYBupTQ")
				.header("cookie", "CSRF-TOKEN=k30YUQAMjWd_KW-juu47aYLvBqeTmIY0fsvzJHhwIGJfrkg8_5CxqhOf8RttIrCsvmm-d2RPYg3F6A3nmAvllQ; _rails_session=Kbqkoj%2Brdhygq9s7KRzhHLCEU5tG9jXTDmCoQpGqsxfKAAeXRAT3%2BGJl4UjwvSuOlX3cX7VMwLWO9h7BIeABV0PsDjDWSXzdHTDry9FrrfEv0OIlvDrnyxMP6V2crtcvlARxQsSN5OZxlny07N22paP%2FHZTwcJoN6ORjaMG4Vmnfs0e9UFpPi2lKlAOXOhjXH0bWJa5bCLSBBYamBN%2FEnF6HBGsng8hbwKAZCmy1E8o3nrUEdQTyiVv2KwNBrgNBxMAS3z4FMqq6kqXN4rzG83MAAav2x0F4np1%2BdYprh5iTcZdI4hWKZT2oJRo7SoHM5Ej1nsVqDn1AtDllNzVc8lpoDMNZEvORsmkh1rq6B%2FmrdxneMswQ6bPeyLzZjp1SoBOOHbebUtlTQumEjWj1ve0J4xndP%2FrJQsxKnodxy2d2KX9Fn5n7bQ0v5KTxvw%3D%3D--6aI7ZjKzgh%2FMs3EV--B669LVWTYGLE%2B6n4p81Guw%3D%3D")
				.body(RawFileBody("xsell/voice/newEngagement_request.json"))
                    .check(status.is(200))
		)

    //Setup 2000 users during 5 minutes
    setUp(
        scenario1.inject(rampUsers(2000).during(1.minutes))
    ).protocols(httpProtocol)
}
