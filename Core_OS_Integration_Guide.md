# 🏥 Core Clinic OS Integration Guide
**For: Renwal Multi-Speciality Hospital**

To integrate the Booking, Walk-in, Live Queue, and Patient Management system from this prototype into the Renwal Multi-Speciality Hospital project, you only need to migrate the **"Core Engine"** and its related API/UI components.

Here is the exact breakdown of the Core OS that powers this system. You can instruct developers to copy and adapt these specific folders and files.

---

## 1. 🧠 Core Engine (The Brain)
This is the most important part. It handles all queue logic, token generation, and state management.

**Location:** `src/features/clinic/`

| File / Folder | Purpose | Action Needed |
| :--- | :--- | :--- |
| `types.ts` | Contains `ClinicId`, `QueueEntry`, `QueueStatus` etc. | **Copy & Adapt**. Add Renwal's departments (e.g., Cardiology, Ortho) in `ClinicId`. |
| `catalog.ts` | Defines the clinics (prefix, name, doctors, timings). | **Modify**. Replace with Renwal's actual departments and doctors. |
| `services/queue-engine.ts` | The core algorithm! Generates tokens, manages queue order, skips, holds, and tomorrow shifts. | **Copy EXACTLY**. This is the heart of the logic. |
| `services/clinic-service.ts` | Database interaction layer (Supabase operations). | **Copy**. |
| `state/clinic-provider.tsx` | React Context Provider that holds the live state in the browser and exposes actions (`advanceQueue`, `createWalkIn`). | **Copy**. Wrap the Renwal app with this provider. |
| `hooks/use-realtime-queue.ts` | Supabase websocket listener for live database updates. | **Copy**. |
| `hooks/use-live-queue-polling.ts` | Polling fallback for live screens. | **Copy**. |

---

## 2. 🔌 Backend Endpoints (The APIs)
The system uses Next.js Route Handlers to communicate securely with Supabase.

**Location:** `src/app/api/`

| Folder | Purpose |
| :--- | :--- |
| `api/clinics/sync/route.ts` | The main API that synchronizes offline/provisional tokens with the actual database. **(Crucial)** |
| `api/auth/pin-login/route.ts` | Secure PIN-based login for Staff/Doctors. |
| `api/patients/` | Endpoints to fetch patient history and previous visits based on mobile numbers. |
| `api/schedule/` | APIs to check if doctor is on leave or tokens are closed for the day. |

---

## 3. 🖥️ Frontend Interfaces (The Views)
You will need to migrate these pages, but their UI/styling can be adapted to match Renwal's branding. The logic inside them is what matters.

**Location:** `src/app/`

| Page | What it does | Integration Note |
| :--- | :--- | :--- |
| `book/page.tsx` | Online booking interface (future slots). | Adapt the form UI. Uses `createBooking` from the provider. |
| `walkin/page.tsx` | On-the-spot token generation. | Very simple form. Uses `createWalkIn`. |
| `live/page.tsx` | Large display for waiting areas. | Needs to be styled for Renwal's TVs. Uses `useLiveQueuePolling`. |
| `status/page.tsx` | Patient self-tracking (entering mobile to see wait time). | Relies heavily on `getQueueSummary` and `getEntryPosition` from the queue engine. |
| `staff/page.tsx` | The control panel for doctors and receptionists. | **Core UI**. Contains all the logic for advancing queues, holds, skipping, and emergency closing. |

---

## 4. 🗄️ Database Schema (Supabase)
The Renwal project will need these identical tables in their Supabase/PostgreSQL instance:

1.  **`clinic_state`**: Stores emergency status and last sync time per clinic.
2.  **`queue_entries`**: The main table. Needs columns: `id`, `clinic_id`, `token`, `name`, `mobile`, `source`, `day_label`, `status`, `sync_state`.
3.  **`staff_members`**: For the PIN login system.

---

## 🚀 How to instruct the integration:

When you are ready to implement this in the Renwal project, you can give the AI or developer this prompt:

> *"We are integrating a Queue & Booking Engine. First, copy the `src/features/clinic/` directory from the Smart Clinic OS project and adapt `catalog.ts` for Renwal Hospital's departments. Second, implement the Supabase synchronization APIs from `src/app/api/clinics/`. Finally, build the Staff Dashboard and Live Display using the `ClinicProvider` context for state management."*
