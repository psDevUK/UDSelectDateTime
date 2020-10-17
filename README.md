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
* **monthsShown** - Is defaulted to 1 but changing this number would display the amount of calendar months, and if you select true on 
* **timeFormat** - This is defaulted to HH:mm please see documentation on website for more information
* **dateFormat** - Is defaulted to MMMM d, yyyy h:mm  please see documentation on website for more informaiton

# I have now updated this component
 
 I had a request to allow the user to specify the start date.  Whilst I was at it, I noticed some other handy parameters I could add. So please see the 11 additional things I done to upgrade this component
 
* **-StartDate** allows you to define the initial date shown on the calendat to stop it defaulting to current date time
* **-Placeholder** you can now specify a string to be displayed when the date has been cleared
* **classname** a dedicated classname of **udSelectDateTime** has been added to allow custom CSS styling
* **-shouldCloseOnSelect** is a boolean set to $false to determine if the calendar should automatic close after date and time selection
* **-dateFormatCalendar** is a string value to determine how the calendar displays the month and year it is showing
* **-showPopperArrow** is a boolean value set to $true to determine if the calendar should have a pooper arrow or not
* **-showYearDropdown** is a boolean value to allow you to show a year drop down menu in the calendar for quick year selection
* **-showMonthDropdown** same as above but for the month names
* **-startOpen** a boolean value to determine if the calendar should show without the user clicking in the field area
* **-fixedHeight** boolean value to detemrine if you should keep a fixed height on the calendar
* **-inline** also a boolean value, setting this to true, will only ever show the calendar and not the text field

## Example Using The Component

```dateFormatCalendar** is a string value to determine how the calendar displays the month and year it is showing
* **-showPopperArrow** is a boolean value set to $true to determine if the calendar should have a pooper arrow or not
* **-showYearDropdown** is a boolean value to allow you to show a year drop down menu in the calendar for quick year selection
* **-showMonthDropdown** same as above but for the month names
* **-startOpen** a boolean value to determine if the calendar should show without the user clicking in the field area
* **-fixedHeight** boolean value to detemrine if you should keep a fixed height on the calendar
* **-inline** also a boolean value, setting this to true, will only ever show the calendar and not the text field
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

# Demo with new parameters

```
 New-UdColumn -Size 3 -Endpoint {
           $future = (get-date).AddDays(4).AddHours(3).AddMinutes(15)
           $Exclude = (get-date).AddDays(-3)
                New-UDSelectDateTime -Id "Picker" -StartDate $future -TimeIntervals 5 -WeekNumbers $true -Clearable $true  -OnChange {
                     $Session:Selected = $eventData
                 } -DateFormatCalendar "MMMM yyyy" -CloseOnSelect $true -showPopperArrow $true -showYearDropdown $true -showMonthDropdown $true -startOpen $false -inline $true -fixedHeight $true
            } -AutoRefresh
```

## Also

  As I am from the United Kingdom I fixed the locale issue and this is now defaulted to enGB sorry I do not know how to dynamically change this, but if you are from another country really wanting this in your home language I am more than happy to make it happen and release a language specific component for you 
