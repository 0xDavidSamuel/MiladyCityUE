#include "AuthService.h"

AAuthService::AAuthService()
{
    PrimaryActorTick.bCanEverTick = false;
    LoginURL = TEXT("https://miladycity.vercel.app");
}

void AAuthService::OpenLoginPage()
{
    FPlatformProcess::LaunchURL(*LoginURL, nullptr, nullptr);
}

void AAuthService::HandleDeepLink(const FString& URL)
{
    if (URL.StartsWith(TEXT("miladycity://auth")))
    {
        WalletAddress = ParseWalletFromURL(URL);
        
        if (!WalletAddress.IsEmpty())
        {
            OnAuthComplete.Broadcast(WalletAddress);
        }
    }
}

FString AAuthService::ParseWalletFromURL(const FString& URL)
{
    FString Wallet;
    FString Query = URL;
    
    int32 QueryStart;
    if (Query.FindChar('?', QueryStart))
    {
        Query = Query.RightChop(QueryStart + 1);
        
        TArray<FString> Params;
        Query.ParseIntoArray(Params, TEXT("&"));
        
        for (const FString& Param : Params)
        {
            FString Key, Value;
            if (Param.Split(TEXT("="), &Key, &Value))
            {
                if (Key == TEXT("wallet"))
                {
                    Wallet = Value;
                    break;
                }
            }
        }
    }
    
    return Wallet;
}
