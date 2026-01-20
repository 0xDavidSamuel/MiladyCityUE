#pragma once

#include "CoreMinimal.h"
#include "GameFramework/Actor.h"
#include "AuthService.generated.h"

DECLARE_DYNAMIC_MULTICAST_DELEGATE_OneParam(FOnAuthComplete, const FString&, WalletAddress);

UCLASS()
class MILADYCITY_API AAuthService : public AActor
{
    GENERATED_BODY()

public:
    AAuthService();

    UPROPERTY(BlueprintAssignable, Category = "Auth")
    FOnAuthComplete OnAuthComplete;

    UFUNCTION(BlueprintCallable, Category = "Auth")
    void OpenLoginPage();

    UFUNCTION(BlueprintCallable, Category = "Auth")
    void HandleDeepLink(const FString& URL);

    UFUNCTION(BlueprintPure, Category = "Auth")
    FString GetWalletAddress() const { return WalletAddress; }

    UFUNCTION(BlueprintPure, Category = "Auth")
    bool IsAuthenticated() const { return !WalletAddress.IsEmpty(); }

private:
    FString WalletAddress;
    FString LoginURL;

    FString ParseWalletFromURL(const FString& URL);
};
