# Project LINGKOD: Communication Templates

This document contains the standardized templates for alerts disseminated through the "last-mile" communication channels. Templates are designed to be clear, concise, and actionable.

## 0. Template Metadata & Audit Fields
Operator-facing metadata is attached to each alert for governance and audit (not all fields are user-visible in messages):
- reviewedBy: [Operator Name]
- approvedAt: [ISO8601 timestamp]
- confidence: [0..1]
- status: Actual | Exercise | Test
- msgType: Alert | Update | Cancel
- alertId: [UUID]
- rulePackVersion: vX.Y.Z
- capUrl: /api/v1/cap/[alertId]
- geojsonUrl: /api/v1/alerts/[alertId]

## 1. SMS Alert Templates

*   **Language:** Templates should be available in English, Filipino, and local dialects.
*   **Character Limit:** All messages must be mindful of the standard SMS character limit (160 characters).
*   **Operator Metadata (not sent to recipients):** reviewedBy, approvedAt, confidence, status (Actual|Exercise|Test), msgType (Alert|Update|Cancel), alertId, rulePackVersion

### 1.1. Flash Flood Alert
*   **Severity 3 (High - Imminent Threat):**
    *   **English:** `FLOOD ALERT! Imminent flash flood expected in Brgy. [Barangay Name] within 1 hour. Move to higher ground NOW. Stay away from rivers. -[PDRRMO]`
    *   **Filipino:** `BABALA NG BAHA! Inaasahan ang biglaang pagbaha sa Brgy. [Barangay Name] sa loob ng 1 oras. Lumikas sa mas mataas na lugar NGAYON. Iwasan ang ilog. -[PDRRMO]`

*   **Severity 2 (Moderate - Watch):**
    *   **English:** `FLOOD WATCH: Brgy. [Barangay Name] is under a flash flood watch due to heavy rains. Be prepared to evacuate. Monitor local news. -[PDRRMO]`
    *   **Filipino:** `PAGBANTAY SA BAHA: Ang Brgy. [Barangay Name] ay binabantayan para sa posibleng biglaang pagbaha dahil sa malakas na ulan. Maging handa sa paglikas. Subaybayan ang balita. -[PDRRMO]`

### 1.2. Sustained Rainfall Alert
*   **Severity 2 (Moderate - Watch):**
    *   **English:** `WEATHER ALERT: Sustained heavy rainfall in [Municipality Name]. Risk of landslides and flooding in low-lying areas. Stay alert. -[PDRRMO]`
    *   **Filipino:** `BABALA SA PANAHON: Patuloy ang malakas na pag-ulan sa [Municipality Name]. Posible ang pagguho ng lupa at pagbaha sa mabababang lugar. Manatiling alerto. -[PDRRMO]`

## 2. Radio Broadcast Scripts

*   **Format:** Scripts are designed to be read clearly and repeated.

### 2.1. Flash Flood Alert (Severity 3)
> [OPERATOR HEADER - NOT BROADCAST] Reviewed by: [Operator Name] | Approved: [ISO8601] | Confidence: [0.82] | RulePack: vX.Y.Z | MsgType: Alert | Status: Actual
>
> **(URGENT WEATHER BULLETIN - REPEAT THREE TIMES)**
>
> This is an urgent flood warning from the Provincial Disaster Risk Reduction and Management Office.
>
> Due to [Reason, e.g., intense rainfall and rising river levels], a flash flood is expected to affect **Barangay [Barangay Name]** in **[Municipality Name]** within the next hour.
>
> All residents in Barangay [Barangay Name], especially those near the [River Name] river, are advised to **EVACUATE IMMEDIATELY** to higher ground.
>
> I repeat, all residents in Barangay [Barangay Name] must evacuate to higher ground now. Secure your families and important belongings. Do not attempt to cross rising waters.
>
> Stay tuned to this station for more updates.
>
> [FOOTER - NOT BROADCAST] MessageID: [alertId] | CAP: /api/v1/cap/[alertId] | GeoJSON: /api/v1/alerts/[alertId]

## 3. Barangay Official Alerts (Direct Notification)

*   **Format:** More detailed than public SMS, sent to local leaders.

### 3.1. Flash Flood Alert (Severity 3)
> **Subject: URGENT FLOOD ALERT - Brgy. [Barangay Name]**
>
> Reviewed by: [Operator Name] | Approved: [ISO8601] | Confidence: [0.82] | RulePack: vX.Y.Z | MsgType: Alert | Status: Actual
>
> LINGKOD Alert: SEV 3 FLASH FLOOD WARNING for your area of responsibility, Brgy. [Barangay Name].
>
> **Data:**
> - Rainfall: [Current ARG Reading] mm/hr
> - Water Level: [Current AWLG Reading] meters, rising rapidly.
> - Prediction: Flooding expected within 1 hour.
>
> **Action:**
> 1. Activate your local emergency response team.
> 2. Immediately begin evacuation of residents in low-lying and riverside areas to designated evacuation centers.
> 3. Await further instructions.
>
> Acknowledge receipt of this message.
> MessageID: [alertId] | CAP: /api/v1/cap/[alertId] | GeoJSON: /api/v1/alerts/[alertId]
> -PDRRMO Command Center
