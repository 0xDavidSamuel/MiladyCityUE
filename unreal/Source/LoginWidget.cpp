#include "LoginWidget.h"
#include "AuthService.h"
#include "Kismet/GameplayStatics.h"

void ULoginWidget::NativeConstruct()
{
    Super::NativeConstruct();

    if (LoginButton)
    {
        LoginButton->OnClicked.AddDynamic(this, &ULoginWidget::OnLoginClicked);
    }

    AuthService = Cast<AAuthService>(UGameplayStatics::GetActorOfClass(GetWorld(), AAuthService::StaticClass()));
    
    if (AuthService)
    {
        AuthService->OnAuthComplete.AddDynamic(this, &ULoginWidget::OnAuthComplete);
    }
}

void ULoginWidget::OnLoginClicked()
{
    if (StatusText)
    {
        StatusText->SetText(FText::FromString(TEXT("Connecting...")));
    }

    if (AuthService)
    {
        AuthService->OpenLoginPage();
    }
}

void ULoginWidget::OnAuthComplete(const FString& WalletAddress)
{
    if (StatusText)
    {
        FString DisplayAddress = WalletAddress.Left(6) + TEXT("...") + WalletAddress.Right(4);
        StatusText->SetText(FText::FromString(DisplayAddress));
    }

    if (LoginButton)
    {
        LoginButton->SetIsEnabled(false);
    }
}
