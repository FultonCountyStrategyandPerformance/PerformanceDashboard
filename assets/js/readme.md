<a name="data"></a>

## data.js
data.js is the overarching object of functions being used to collect, set, or
alter the data

**Kind**: global variable  

* [data](#data)
    * [.initData(base, b_url)](#data.initData) ⇒ <code>array</code>
        * [~getExpenseAmount(url)](#data.initData..getExpenseAmount) ⇒ <code>object</code>
    * [.computeOnTarget(ontarget)](#data.computeOnTarget)
    * [.computeOffTarget(offtarget)](#data.computeOffTarget)
    * [.computeMeasuring(measuring)](#data.computeMeasuring)
    * [.newOnTarget(goalArray)](#data.newOnTarget) ⇒ <code>int</code>
    * [.newOffTarget(goalArray)](#data.newOffTarget) ⇒ <code>int</code>
    * [.computeCount(goalArray)](#data.computeCount)
    * [.computeContent(goalArray)](#data.computeContent)
        * [~addCommas(nStr)](#data.computeContent..addCommas) ⇒ <code>string</code>
    * [.selectionContent(goalArray)](#data.selectionContent)
    * [.computeContentBoard(goalArray)](#data.computeContentBoard)
    * [.setUpcomingEvents(eventsUrl)](#data.setUpcomingEvents)
        * [~getUpcomingEvents(eventsUrl, month)](#data.setUpcomingEvents..getUpcomingEvents) ⇒ <code>array</code>
        * [~getMonths(eventsUrl)](#data.setUpcomingEvents..getMonths) ⇒ <code>array</code>

<a name="visuals"></a>
## visuals.js
Visual charts object of functions related to rendering the charts

**Kind**: global variable  

* [visuals](#visuals)
    * [.initPickColor()](#visuals.initPickColor)
    * [.initChartist(d, t, goalId, budget)](#visuals.initChartist)
        * [~ctPointLabels(options)](#visuals.initChartist..ctPointLabels) ⇒ <code>function</code>
        * [~addCommas(nStr)](#visuals.initChartist..addCommas) ⇒ <code>string</code>
    * [.newChart(d, t, goalId)](#visuals.newChart)

<a name="data.initData"></a>

### data.initData(base, b_url) ⇒ <code>array</code>
Initializes the data by getting a list of all dashboards from there
a list of all goals and categories for that dashboard and finally all of
the data related to that goal. This is the slowest part of the app and is
set to update every hour.

**Kind**: static method of [<code>data</code>](#data)  
**Returns**: <code>array</code> - - an array with the
[goalArray - goal data (an object per goal),
 Number of On target,
 Number off target,
 budget data]  

| Param | Type | Description |
| --- | --- | --- |
| base | <code>string</code> | The base performance url, e.g. performance.city.gov |
| b_url | <code>string</code> | The base budget dataset url, e.g. data.city.gov/resource/ardd-12dd.json |

<a name="data.initData..getExpenseAmount"></a>

#### initData~getExpenseAmount(url) ⇒ <code>object</code>
Get expenditures data

**Kind**: inner method of [<code>initData</code>](#data.initData)  
**Returns**: <code>object</code> - - object with budget information  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | expenses url |

<a name="data.computeOnTarget"></a>

### data.computeOnTarget(ontarget)
Sets the HTML for the on target values

**Kind**: static method of [<code>data</code>](#data)  

| Param | Type | Description |
| --- | --- | --- |
| ontarget | <code>int</code> | Number of on target goals |

<a name="data.computeOffTarget"></a>

### data.computeOffTarget(offtarget)
Sets the HTML for the on target values

**Kind**: static method of [<code>data</code>](#data)  

| Param | Type | Description |
| --- | --- | --- |
| offtarget | <code>int</code> | Number of off target goals |

<a name="data.computeMeasuring"></a>

### data.computeMeasuring(measuring)
Sets the HTML for the on target values

**Kind**: static method of [<code>data</code>](#data)  

| Param | Type | Description |
| --- | --- | --- |
| measuring | <code>int</code> | Number of measuring target goals |

<a name="data.newOnTarget"></a>

### data.newOnTarget(goalArray) ⇒ <code>int</code>
Recalculate the number of on target goals

**Kind**: static method of [<code>data</code>](#data)  
**Returns**: <code>int</code> - - number of on target goals  

| Param | Type | Description |
| --- | --- | --- |
| goalArray | <code>array</code> | array of post-filtered goal objects |

<a name="data.newOffTarget"></a>

### data.newOffTarget(goalArray) ⇒ <code>int</code>
Recalculate the number of off target goals

**Kind**: static method of [<code>data</code>](#data)  
**Returns**: <code>int</code> - - number of off target goals  

| Param | Type | Description |
| --- | --- | --- |
| goalArray | <code>array</code> | array of post-filtered goal objects |

<a name="data.computeCount"></a>

### data.computeCount(goalArray)
Sets the HTML for the number of total goals

**Kind**: static method of [<code>data</code>](#data)  

| Param | Type | Description |
| --- | --- | --- |
| goalArray | <code>array</code> | Complete goal array set |

<a name="data.computeContent"></a>

### data.computeContent(goalArray)
Dynamically create the html string for the goal data as well as the
chart and goal time template

**Kind**: static method of [<code>data</code>](#data)  

| Param | Type | Description |
| --- | --- | --- |
| goalArray | <code>object</code> | The goal information object from initData[0] |

<a name="data.computeContent..addCommas"></a>

#### computeContent~addCommas(nStr) ⇒ <code>string</code>
Add commas to large goal values

**Kind**: inner method of [<code>computeContent</code>](#data.computeContent)  

| Param | Type | Description |
| --- | --- | --- |
| nStr | <code>string</code> | Value to add commas to |

<a name="data.selectionContent"></a>

### data.selectionContent(goalArray)
Dynamically create the HTML for the selection filtering page based
off all available goal data

**Kind**: static method of [<code>data</code>](#data)  

| Param | Type | Description |
| --- | --- | --- |
| goalArray | <code>object</code> | array of goalInfo objects |

<a name="data.computeContentBoard"></a>

### data.computeContentBoard(goalArray)
Content board creation from goalInfo objects

**Kind**: static method of [<code>data</code>](#data)  

| Param | Type | Description |
| --- | --- | --- |
| goalArray | <code>array</code> | An array of goalInfo objects from initData |

<a name="data.setUpcomingEvents"></a>

### data.setUpcomingEvents(eventsUrl)
Sets the upcoming events side panel

**Kind**: static method of [<code>data</code>](#data)  

| Param | Type | Description |
| --- | --- | --- |
| eventsUrl | <code>string</code> | The base url for the events dataset, e.g. data.city.gov/resource/askl-avav.json |


* [.setUpcomingEvents(eventsUrl)](#data.setUpcomingEvents)
    * [~getUpcomingEvents(eventsUrl, month)](#data.setUpcomingEvents..getUpcomingEvents) ⇒ <code>array</code>
    * [~getMonths(eventsUrl)](#data.setUpcomingEvents..getMonths) ⇒ <code>array</code>

<a name="data.setUpcomingEvents..getUpcomingEvents"></a>

#### setUpcomingEvents~getUpcomingEvents(eventsUrl, month) ⇒ <code>array</code>
Return the events for a particular month

**Kind**: inner method of [<code>setUpcomingEvents</code>](#data.setUpcomingEvents)  
**Returns**: <code>array</code> - - array objects of events [{"event":"Event text"}]  

| Param | Type | Description |
| --- | --- | --- |
| eventsUrl | <code>string</code> | The events dataset base url |
| month | <code>string</code> | the particular month |

<a name="data.setUpcomingEvents..getMonths"></a>

#### setUpcomingEvents~getMonths(eventsUrl) ⇒ <code>array</code>
Return the available months in the dataset

**Kind**: inner method of [<code>setUpcomingEvents</code>](#data.setUpcomingEvents)  
**Returns**: <code>array</code> - - array objects of months and priorities [{"month":"Event text","priority":"Priority Text"}]  

| Param | Type | Description |
| --- | --- | --- |
| eventsUrl | <code>string</code> | The events dataset base url |



<a name="visuals.initPickColor"></a>

### visuals.initPickColor()
Color for the bar and line charts

**Kind**: static method of [<code>visuals</code>](#visuals)  
<a name="visuals.initChartist"></a>

### visuals.initChartist(d, t, goalId, budget)
Initializes all the charts on the page

**Kind**: static method of [<code>visuals</code>](#visuals)  

| Param | Type | Description |
| --- | --- | --- |
| d | <code>array</code> | the line chart data (observed) |
| t | <code>array</code> | the line chart target data |
| goalId | <code>string</code> | The goal id used to identify the goal chart div |
| budget | <code>array</code> | budget data |


* [.initChartist(d, t, goalId, budget)](#visuals.initChartist)
    * [~ctPointLabels(options)](#visuals.initChartist..ctPointLabels) ⇒ <code>function</code>
    * [~addCommas(nStr)](#visuals.initChartist..addCommas) ⇒ <code>string</code>

<a name="visuals.initChartist..ctPointLabels"></a>

#### initChartist~ctPointLabels(options) ⇒ <code>function</code>
Add the labels to points along the bar graphs

**Kind**: inner method of [<code>initChartist</code>](#visuals.initChartist)  

| Param | Type |
| --- | --- |
| options | <code>object</code> |

<a name="visuals.initChartist..addCommas"></a>

#### initChartist~addCommas(nStr) ⇒ <code>string</code>
Add commas to large goal values

**Kind**: inner method of [<code>initChartist</code>](#visuals.initChartist)  

| Param | Type | Description |
| --- | --- | --- |
| nStr | <code>string</code> | Value to add commas to |

<a name="visuals.newChart"></a>

### visuals.newChart(d, t, goalId)
Redraw each chart after the carousel slider moves

**Kind**: static method of [<code>visuals</code>](#visuals)  

| Param | Type | Description |
| --- | --- | --- |
| d | <code>object</code> | Goal data |
| t | <code>object</code> | Target data |
| goalId | <code>string</code> | the ID of the goal to select the right div |
