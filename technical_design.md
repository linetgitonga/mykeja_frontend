# MyKeja – Technical Design Document
## Description: A house hunting platform for Kenya, focused on trust, transparency, and enforcement.

**production-grade, scalable architecture** tailored to:

* Kenyan payments (M-Pesa centric)
* Locking & booking consistency
* Agent verification (non-ID based)
* Regulatory-safe structure
* Strong data protection

---

# 🔷 MyKeja – End-to-End Technical Architecture

## 1️⃣ High-Level System Architecture

```
Client Apps (Web / Mobile)
        │
        ▼
API Gateway / Load Balancer
        │
        ▼
Application Layer (Core Services)
        │
        ├── Auth Service
        ├── Property Service
        ├── Booking & Lock Service
        ├── Payment Service
        ├── Agent Management Service
        ├── Notification Service
        ├── Admin & Moderation Service
        │
        ▼
Data Layer
        ├── PostgreSQL (Primary DB)
        ├── Redis (Locking & Caching)
        ├── Object Storage (Images/Documents)
        └── Audit Logs Store
```

---

# 2️⃣ Core Architectural Style

### Recommended Approach:

**Modular Monolith → Designed for Future Microservices**

Since you're early stage, do NOT jump to microservices.

Use:

* Single backend (NestJS or Django)
* Clearly separated domain modules
* Independent database schemas per module (logical separation)

Later you can extract services.

---

# 3️⃣ Core System Components

---

## A. Authentication & Identity Layer

### Responsibilities

* User registration (Tenant / Agent / Owner)
* Role-based access control (RBAC)
* JWT + Refresh tokens
* OTP verification (SMS via M-Pesa ecosystem)

### Roles

* Tenant
* Agent
* Owner
* Admin
* Super Admin

---

## B. Agent Verification System (Without ID Upload)

Since you prefer physical verification:

### Verification Workflow

1. Agent registers (basic info)
2. Status = `PendingVerification`
3. Admin assigns field officer
4. Field officer:

   * Visits office/location
   * Confirms business legitimacy
   * Takes geo-tagged photos
   * Signs digital verification form
5. Admin approves → Status = `Verified`

### Database Design

```
Agent
- id
- verification_status (enum)
- strike_count
- subscription_status
- verification_notes
- verified_by
- verified_at
```

Verification evidence stored in object storage (S3-like).

---

# 4️⃣ Property Management Architecture

Single table design (as you proposed):

```
Property
- id
- agent_id / owner_id
- title
- price
- location_general (e.g. "Kahawa Sukari")
- location_specific (coordinates/map pin)
- status (enum)
- lock_expires_at
- booking_id (nullable)
- created_at
- updated_at
```

### Status Enum

* AVAILABLE
* LOCKED
* BOOKED
* VIEWED
* OCCUPIED
* REMOVED

---

## Property Photos & Location Access Control

### Photo Types

MyKeja uses a **tiered photo access strategy** to protect agent/owner interests:

```
PropertyPhoto
- id
- property_id
- url
- photo_type (INTERNAL, EXTERNAL)
- is_feature_image (boolean)
- display_order
```

**Photo Access Rules:**

* **Internal Photos** (kitchen, living room, bathrooms, etc.)
  * Accessible at any time
  * Used as feature images in listings
  * Visible to all users browsing properties

* **External Photos** (building exterior, gate, compound, etc.)
  * Restricted until payment confirmed
  * Only accessible after `Booking.status = PAID`
  * Prevents property identification before commitment

### Location Data Strategy

**Two-tier location disclosure:**

1. **General Location** (Always Visible)
   * Area name (e.g., "Kahawa Sukari", "Kilimani")
   * Approximate radius indicator
   * Displayed in search results
   * Stored in: `Property.location_general`

2. **Specific Location** (Payment-Gated)
   * Exact GPS coordinates
   * Map pin with precise address
   * Only accessible when: `Booking.status = PAID`
   * Stored in: `Property.location_specific`

### API Access Control Logic

```
GET /properties/:id/photos
→ If user has not paid:
    return only INTERNAL photos
→ If Booking.status = PAID:
    return ALL photos

GET /properties/:id/location
→ If user has not paid:
    return location_general
→ If Booking.status = PAID:
    return location_specific (coordinates)
```

**Why This Matters:**

* Prevents property sniping (users bypassing platform)
* Protects agent commission
* Ensures platform value
* Maintains competitive advantage

---

# 5️⃣ Locking & Concurrency Control (CRITICAL)

This is your most sensitive logic.

### Problem:

Prevent two users booking same house.

### Solution:

Use **Redis Distributed Locking**

When booking:

1. Acquire Redis lock on property_id
2. Validate status = AVAILABLE
3. Set status = LOCKED
4. Set `lock_expires_at = now + 3 days`
5. Release lock

### Background Job

Cron job every 5 minutes:

```
Find properties where:
status = LOCKED
AND lock_expires_at < now

→ Set status = AVAILABLE
```

---

# 6️⃣ Booking Flow Architecture

```
Tenant selects property
        ↓
System locks property (Redis)
        ↓
Booking record created
        ↓
Payment initiated
        ↓
Payment confirmation webhook
        ↓
Status = BOOKED
        ↓
Unlock gated content:
  • External photos
  • Specific location (GPS coordinates)
  • Agent contact details
```

### Booking Table

```
Booking
- id
- property_id
- tenant_id
- status (PENDING, PAID, CANCELLED, FAILED)
- visit_date
- confirmation_status
- created_at
```

---

# 7️⃣ Payment Architecture (Do NOT Hold Money Directly)

```
Tenant → MyKeja → PSP (e.g. M-Pesa API) → Escrow Account
```

At scale we will use PSP escrow accounts, but for now we can:

### Recommended Structure (for now)
Flow
Tenant
→ M-Pesa C2B
→ MyKeja Paybill / Till
→ We later pay agent via B2C


Use:

* Safaricom Daraja API

### Payment Service Responsibilities

* Initiate STK Push
* Store transaction reference
* Handle webhook callback
* Validate transaction
* Update booking status

Never trust frontend confirmation.

---

# 8️⃣ Notification & Visit Confirmation System

After visit date:

Background job:

```
Find bookings where:
visit_date = yesterday
confirmation_status = null
```

Send:

* SMS
* Push notification
* Email

User confirms:

* YES (Viewed)
* NO (Did not view)
* Agent absent

This triggers:

* Strike logic
* Unlock logic
* Escalation

---

# 9️⃣ Strike & Penalty Engine

Separate logic service:

```
If tenant reports property occupied:
    → increment strike_count
    → record violation
    → if strike_count >= threshold:
           reduce ranking
           or suspend account
```

Never delete immediately. Use progressive discipline.

---

# 🔟 Ratings & Review System

**Critical for trust and platform defensibility.**

See dedicated design: [rating_design.md](rating_design.md)

### Core Principles

* **Verified ratings only** – rating eligibility tied to confirmed bookings
* **Structured metrics** – not just stars + comments
* **Anti-abuse mechanisms** – moderation, flagging, dispute resolution
* **Legal protection** – moderation workflow to prevent defamation liability

### Rating Targets

Separate rating types:

1. **Agent Rating** (professionalism, honesty, punctuality)
2. **Property Rating** (accuracy, condition, amenities)
3. **Experience Rating** (overall viewing experience)

### Rating Table

```
Rating
- id
- booking_id (enforces authenticity)
- property_id
- agent_id
- tenant_id
- rating_type (AGENT, PROPERTY, EXPERIENCE)
- score (1–5)
- comment (nullable)
- is_flagged
- status (PENDING_REVIEW, APPROVED, REMOVED)
- created_at
```

**Constraints:**

* `UNIQUE(booking_id, rating_type)` – one rating per booking per type
* Can only rate if: `Booking.status = PAID AND visit_date < now AND confirmation_status = VIEWED`

### Aggregation Strategy

Precompute rating statistics for performance:

```
AgentStats
- agent_id
- avg_rating
- rating_count
- distribution (1-star, 2-star, etc.)
```

Update via database trigger or background worker.

### Moderation Workflow

1. Rating submitted → `status = PENDING_REVIEW`
2. Auto-scan for profanity, threats, defamation
3. If flagged → admin review
4. If approved → `status = APPROVED` → public visibility
5. Users can report reviews → `CommentModeration` table

**Display Rules:**

* Show average only after minimum 5 ratings
* Before threshold: show "New Agent" badge
* Display verification badges instead of low-sample ratings

### Integration with Ranking

Agent/property ranking incorporates:

```
Score = (Agent rating × 0.3)
      + (Strike penalty × -0.4)
      + (Completion rate × 0.2)
      + (Recency × 0.1)
```

---

# 1️⃣1️⃣ Data Protection Architecture

To comply with Data Protection Act:

### A. Encryption

* TLS everywhere
* Encrypt PII fields at application level
* Hash passwords (bcrypt/argon2)

### B. Data Separation

* Payment data separated from user data
* Audit logs immutable
* No sensitive data in logs

### C. Data Retention

Add:

```
user.deleted_at
```

Soft deletion first.
Permanent deletion via background cleanup.

---

# 1️⃣2️⃣ Infrastructure Recommendation

### Cloud Setup

Option A:

* AWS (EC2 + RDS + S3)
  Option B:
* DigitalOcean (Simpler early stage)

### Use:

* Docker
* CI/CD pipeline
* Secrets manager
* Auto backups (daily)

---

# 1️⃣3️⃣ Admin & Moderation Panel

Separate internal dashboard:

Features:

* Approve agents
* Manage strikes
* Remove fake listings
* View booking disputes
* Refund control
* Moderate ratings & comments
* Review flagged content

Never mix with user API.

---

# 1️⃣4️⃣ Logging & Audit Layer

Every sensitive action:

* Booking creation
* Payment confirmation
* Status change
* Strike issued

Must generate:

```
AuditLog
- actor_id
- action
- entity_type
- entity_id
- timestamp
- metadata
```

This protects you legally.

---

# 🔥 Final Architecture Layers Summary

| Layer              | Responsibility         |
| ------------------ | ---------------------- |
| Presentation       | Web & Mobile           |
| API Gateway        | Routing, Rate limiting |
| Core Services      | Business logic         |
| Redis              | Locking & Caching      |
| PostgreSQL         | Main DB                |
| Object Storage     | Images, documents      |
| PSP Integration    | Payment processing     |
| Background Workers | Unlocks, notifications |
| Admin Panel        | Governance             |

---

# Strategic Advice

Your competitive advantage is:

* Trust
* Enforcement
* Transparent locking
* Agent discipline

So architect for:

* Consistency
* Auditability
* Legal defensibility

Not just speed.

---

If you want next, I can:

* Draw a **database schema diagram**
* Design the **state machine for property lifecycle**
* Create a **sequence diagram for booking + payment**
* Or help you define the **API contracts (REST endpoints)**
