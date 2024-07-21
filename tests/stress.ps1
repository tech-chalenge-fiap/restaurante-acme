param (
    [int]$iterations,
    [string]$url,
    [string]$token
)

$headers = @{
    Authorization = $token
    ContentType = "application/json"
}

for ($i = 1; $i -le $iterations; $i++) {
    $body = @{
        orderProducts = @(
            @{
                count = 2
                productId = "8e2a99f0-9e7d-4adc-a5ec-0535b5e52d69"
            }
        )
    }
    $response = Invoke-RestMethod -Uri $url -Method Post -Headers $headers -Body ($body | ConvertTo-Json)
    echo $response
    $id = $response.orderId

    $order = Invoke-RestMethod -Uri $url"?orderId=$id" -Method Get -Headers $headers
    Write-Output $order
}
