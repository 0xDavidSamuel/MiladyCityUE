#pragma once

#include "CoreMinimal.h"
#include "HttpModule.h"
#include "Interfaces/IHttpRequest.h"
#include "Interfaces/IHttpResponse.h"

DECLARE_DELEGATE_TwoParams(FOnRequestComplete, bool, const FString&);

class MILADYCITY_API FWebService
{
public:
    static void Get(const FString& URL, FOnRequestComplete OnComplete);
    static void Post(const FString& URL, const FString& Body, FOnRequestComplete OnComplete);

private:
    static void HandleResponse(FHttpRequestPtr Request, FHttpResponsePtr Response, bool bSuccess, FOnRequestComplete OnComplete);
};
