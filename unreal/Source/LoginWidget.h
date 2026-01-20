#pragma once

#include "CoreMinimal.h"
#include "Blueprint/UserWidget.h"
#include "Components/Button.h"
#include "Components/TextBlock.h"
#include "LoginWidget.generated.h"

UCLASS()
class MILADYCITY_API ULoginWidget : public UUserWidget
{
    GENERATED_BODY()

public:
    virtual void NativeConstruct() override;

    UPROPERTY(meta = (BindWidget))
    UButton* LoginButton;

    UPROPERTY(meta = (BindWidget))
    UTextBlock* StatusText;

    UFUNCTION()
    void OnLoginClicked();

    UFUNCTION()
    void OnAuthComplete(const FString& WalletAddress);

private:
    UPROPERTY()
    class AAuthService* AuthService;
};
