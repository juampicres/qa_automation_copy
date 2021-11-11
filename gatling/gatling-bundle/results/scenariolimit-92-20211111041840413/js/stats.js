var stats = {
    type: "GROUP",
name: "Global Information",
path: "",
pathFormatted: "group_missing-name-b06d1",
stats: {
    "name": "Global Information",
    "numberOfRequests": {
        "total": "1200",
        "ok": "1200",
        "ko": "0"
    },
    "minResponseTime": {
        "total": "182",
        "ok": "182",
        "ko": "-"
    },
    "maxResponseTime": {
        "total": "23763",
        "ok": "23763",
        "ko": "-"
    },
    "meanResponseTime": {
        "total": "10340",
        "ok": "10340",
        "ko": "-"
    },
    "standardDeviation": {
        "total": "5486",
        "ok": "5486",
        "ko": "-"
    },
    "percentiles1": {
        "total": "10233",
        "ok": "10233",
        "ko": "-"
    },
    "percentiles2": {
        "total": "14743",
        "ok": "14743",
        "ko": "-"
    },
    "percentiles3": {
        "total": "19539",
        "ok": "19539",
        "ko": "-"
    },
    "percentiles4": {
        "total": "22048",
        "ok": "22048",
        "ko": "-"
    },
    "group1": {
    "name": "t < 800 ms",
    "count": 20,
    "percentage": 2
},
    "group2": {
    "name": "800 ms < t < 1200 ms",
    "count": 6,
    "percentage": 1
},
    "group3": {
    "name": "t > 1200 ms",
    "count": 1174,
    "percentage": 98
},
    "group4": {
    "name": "failed",
    "count": 0,
    "percentage": 0
},
    "meanNumberOfRequestsPerSecond": {
        "total": "14.286",
        "ok": "14.286",
        "ko": "-"
    }
},
contents: {
"req_sign-in-f2fde": {
        type: "REQUEST",
        name: "Sign In",
path: "Sign In",
pathFormatted: "req_sign-in-f2fde",
stats: {
    "name": "Sign In",
    "numberOfRequests": {
        "total": "600",
        "ok": "600",
        "ko": "0"
    },
    "minResponseTime": {
        "total": "1117",
        "ok": "1117",
        "ko": "-"
    },
    "maxResponseTime": {
        "total": "23763",
        "ok": "23763",
        "ko": "-"
    },
    "meanResponseTime": {
        "total": "10794",
        "ok": "10794",
        "ko": "-"
    },
    "standardDeviation": {
        "total": "5421",
        "ok": "5421",
        "ko": "-"
    },
    "percentiles1": {
        "total": "10569",
        "ok": "10569",
        "ko": "-"
    },
    "percentiles2": {
        "total": "15136",
        "ok": "15136",
        "ko": "-"
    },
    "percentiles3": {
        "total": "20031",
        "ok": "20031",
        "ko": "-"
    },
    "percentiles4": {
        "total": "22982",
        "ok": "22982",
        "ko": "-"
    },
    "group1": {
    "name": "t < 800 ms",
    "count": 0,
    "percentage": 0
},
    "group2": {
    "name": "800 ms < t < 1200 ms",
    "count": 1,
    "percentage": 0
},
    "group3": {
    "name": "t > 1200 ms",
    "count": 599,
    "percentage": 100
},
    "group4": {
    "name": "failed",
    "count": 0,
    "percentage": 0
},
    "meanNumberOfRequestsPerSecond": {
        "total": "7.143",
        "ok": "7.143",
        "ko": "-"
    }
}
    },"req_create-new-enga-6b1dd": {
        type: "REQUEST",
        name: "Create New Engagement",
path: "Create New Engagement",
pathFormatted: "req_create-new-enga-6b1dd",
stats: {
    "name": "Create New Engagement",
    "numberOfRequests": {
        "total": "600",
        "ok": "600",
        "ko": "0"
    },
    "minResponseTime": {
        "total": "182",
        "ok": "182",
        "ko": "-"
    },
    "maxResponseTime": {
        "total": "22827",
        "ok": "22827",
        "ko": "-"
    },
    "meanResponseTime": {
        "total": "9886",
        "ok": "9886",
        "ko": "-"
    },
    "standardDeviation": {
        "total": "5512",
        "ok": "5512",
        "ko": "-"
    },
    "percentiles1": {
        "total": "9709",
        "ok": "9709",
        "ko": "-"
    },
    "percentiles2": {
        "total": "14434",
        "ok": "14434",
        "ko": "-"
    },
    "percentiles3": {
        "total": "19085",
        "ok": "19085",
        "ko": "-"
    },
    "percentiles4": {
        "total": "21545",
        "ok": "21545",
        "ko": "-"
    },
    "group1": {
    "name": "t < 800 ms",
    "count": 20,
    "percentage": 3
},
    "group2": {
    "name": "800 ms < t < 1200 ms",
    "count": 5,
    "percentage": 1
},
    "group3": {
    "name": "t > 1200 ms",
    "count": 575,
    "percentage": 96
},
    "group4": {
    "name": "failed",
    "count": 0,
    "percentage": 0
},
    "meanNumberOfRequestsPerSecond": {
        "total": "7.143",
        "ok": "7.143",
        "ko": "-"
    }
}
    }
}

}

function fillStats(stat){
    $("#numberOfRequests").append(stat.numberOfRequests.total);
    $("#numberOfRequestsOK").append(stat.numberOfRequests.ok);
    $("#numberOfRequestsKO").append(stat.numberOfRequests.ko);

    $("#minResponseTime").append(stat.minResponseTime.total);
    $("#minResponseTimeOK").append(stat.minResponseTime.ok);
    $("#minResponseTimeKO").append(stat.minResponseTime.ko);

    $("#maxResponseTime").append(stat.maxResponseTime.total);
    $("#maxResponseTimeOK").append(stat.maxResponseTime.ok);
    $("#maxResponseTimeKO").append(stat.maxResponseTime.ko);

    $("#meanResponseTime").append(stat.meanResponseTime.total);
    $("#meanResponseTimeOK").append(stat.meanResponseTime.ok);
    $("#meanResponseTimeKO").append(stat.meanResponseTime.ko);

    $("#standardDeviation").append(stat.standardDeviation.total);
    $("#standardDeviationOK").append(stat.standardDeviation.ok);
    $("#standardDeviationKO").append(stat.standardDeviation.ko);

    $("#percentiles1").append(stat.percentiles1.total);
    $("#percentiles1OK").append(stat.percentiles1.ok);
    $("#percentiles1KO").append(stat.percentiles1.ko);

    $("#percentiles2").append(stat.percentiles2.total);
    $("#percentiles2OK").append(stat.percentiles2.ok);
    $("#percentiles2KO").append(stat.percentiles2.ko);

    $("#percentiles3").append(stat.percentiles3.total);
    $("#percentiles3OK").append(stat.percentiles3.ok);
    $("#percentiles3KO").append(stat.percentiles3.ko);

    $("#percentiles4").append(stat.percentiles4.total);
    $("#percentiles4OK").append(stat.percentiles4.ok);
    $("#percentiles4KO").append(stat.percentiles4.ko);

    $("#meanNumberOfRequestsPerSecond").append(stat.meanNumberOfRequestsPerSecond.total);
    $("#meanNumberOfRequestsPerSecondOK").append(stat.meanNumberOfRequestsPerSecond.ok);
    $("#meanNumberOfRequestsPerSecondKO").append(stat.meanNumberOfRequestsPerSecond.ko);
}
