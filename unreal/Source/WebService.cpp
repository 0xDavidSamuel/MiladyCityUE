#include "WebService.h"

void FWebService::Get(const FString& URL, FOnRequestComplete OnComplete)
{
    TSharedRef<IHttpRequest, ESPMode::ThreadSafe> Request = FHttpModule::Get().CreateRequest();
    Request->SetURL(URL);
    Request->SetVerb(TEXT("GET"));
    Request->SetHeader(TEXT("Content-Type"), TEXT("application/json"));
    
    Request->OnProcessRequestComplete().BindLambda(
        [OnComplete](FHttpRequestPtr Req, FHttpResponsePtr Res, bool bSuccess)
        {
            HandleResponse(Req, Res, bSuccess, OnComplete);
        });
    
    Request->ProcessRequest();
}

void FWebService::Post(const FString& URL, const FString& Body, FOnRequestComplete OnComplete)
{
    TSharedRef<IHttpRequest, ESPMode::ThreadSafe> Request = FHttpModule::Get().CreateRequest();
    Request->SetURL(URL);
    Request->SetVerb(TEXT("POST"));
    Request->SetHeader(TEXT("Content-Type"), TEXT("application/json"));
    Request->SetContentAsString(Body);
    
    Request->OnProcessRequestComplete().BindLambda(
        [OnComplete](FHttpRequestPtr Req, FHttpResponsePtr Res, bool bSuccess)
        {
            HandleResponse(Req, Res, bSuccess, OnComplete);
        });
    
    Request->ProcessRequest();
}

void FWebService::HandleResponse(FHttpRequestPtr Request, FHttpResponsePtr Response, bool bSuccess, FOnRequestComplete OnComplete)
{
    if (bSuccess && Response.IsValid())
    {
        OnComplete.ExecuteIfBound(true, Response->GetContentAsString());
    }
    else
    {
        OnComplete.ExecuteIfBound(false, TEXT("Request failed"));
    }
}
