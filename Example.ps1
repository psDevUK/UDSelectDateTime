Import-Module -Name UniversalDashboard
Import-Module -Name UniversalDashboard.UDSelectDateTime
Get-UDDashboard | Stop-UDDashboard
$theme = New-UDTheme -Name "Basic" -Definition @{
    '.react-datepicker__input-container' = @{
        'width' = "140% !important"
    }
} -Parent "Default"
$endpointinit = New-UDEndpointInitialization -Module @("UniversalDashboard.UDSelectDateTime")
Start-UDDashboard -Port 1000 -AutoReload -Dashboard (
    New-UDDashboard -Title "Powershell UniversalDashboard" -Theme $theme -Content {
        New-UDRow -Columns {
            New-UDColumn -Size 3 -Endpoint {
                New-UDSelectDateTime -Id "Picker" -TimeIntervals 5 -WeekNumbers $true -Clearable $true -Locale "en-GB" -OnChange {
                    Show-UDToast -Message "Date Changed $eventData" -Position topLeft -Duration 3000
                }
            } -AutoRefresh
            New-UDColumn -Size 4 -Endpoint {

                New-UDButton -Text "Toast" -OnClick {
                    $val = (Get-UDElement -id "Picker").Attributes.startDate
                    Show-UDToast -Message "Selected:- $val" -Position topLeft -Duration 4000
                }
                New-UDButton -Text "RemoveMe" -OnClick {
                    Remove-UDElement -id "Picker"
                }
                New-UDButton -text "ShowME" -OnClick {
                    Set-UDElement -id "Picker" -Attributes @{
                        hidden = $false
                    }
                }
                New-UDButton -Text "ClearMe" -OnClick {
                    Clear-UDElement -Id "Picker"
                }
            }
        }

    } -EndpointInitialization $endpointinit

)