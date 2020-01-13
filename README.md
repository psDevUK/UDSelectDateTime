# UDSelectDateTime
A component to select the date and time.  It was requested on the UD forums to have a component that was like a calendar component
but would also allow you to select the time. Both things built into one component.  This folks is the answer to that request.  This component is based upon the component shown on reactdatepicker.com I tried to implement as many of the useful props and pass them as powershell parameters
* **TimeIntervals** - Will set the minutes apart on the time display so a setting of 10 will show every 10 minutes on the time select.
* **OnChange** - Allows you to add a scriptblock to do something when the value in the component changes
* **Locale** - Gives you the choice to set the defined locale, this by default is set to en-GB
* **ModalView** - Displays the component centered screen as if it were a modal referred to as portal view on website defaulted false
* **Clearable** - Boolean option allowing you to add a mini clear button to the component defaulted to true
* **WeekNumbers** - This will show the current week numbers in the calendar display defaulted to true
* **showPreviousMonths** - Is set to false by default but would allow you to open the calendar to display previous months
* **monthsShown** - Is defaulted to 1 but changing this number would display the amount of calendar months, and if you select true on **showPreviousMonths** then this will show previous months with the amount this value is set at
* **timeFormat** - This is defaulted to HH:mm please see documentation on website for more information
* **dateFormat** - Is defaulted to MMMM d, yyyy h:mm aa please see documentation on website for more informaiton

## Example Using The Component

```
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
```
