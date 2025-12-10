# 🗄️ PHASE 6: BACKEND EXTENSIONS

## 📋 Overview
Extend imuii-server database schema dan API untuk support showcase fields.

---

## ✅ 6.1 Database Schema Extension

### Step 6.1.1: Review Current Project Model
- [ ] Buka file `imuii-server/internal/model/project.go`
- [ ] Review existing fields:
  - ID, Name, Description, RepoURL, SecretKey
  - Status, Source, OwnerID, Owner
  - Deployments, CreatedAt, UpdatedAt, DeletedAt
- [ ] Understand current structure
- [ ] Note field types dan constraints

### Step 6.1.2: Plan New Fields for Project Model
- [ ] Plan new fields:
  - `ShowcaseTitle` (string, nullable)
  - `ShowcaseDescription` (text, nullable)
  - `TeamMembers` (JSONB, nullable)
  - `YouTubeLink` (string, nullable)
  - `ThumbnailURL` (string, nullable)
  - `IsShowcased` (boolean, default: true)
  - `Tags` (JSONB, nullable)
- [ ] Document field purposes
- [ ] Plan GORM tags untuk each field

### Step 6.1.3: Review Current Portfolio Model
- [ ] Buka file `imuii-server/internal/model/portfolio.go`
- [ ] Review existing fields
- [ ] Understand current structure
- [ ] Note differences dengan Project model

### Step 6.1.4: Plan New Fields for Portfolio Model
- [ ] Plan same fields seperti Project:
  - `ShowcaseTitle`
  - `ShowcaseDescription`
  - `TeamMembers`
  - `YouTubeLink`
  - `ThumbnailURL`
  - `IsShowcased`
  - `Tags`
- [ ] Document field purposes
- [ ] Plan GORM tags

### Step 6.1.5: Create Migration Script - Structure
- [ ] Buka atau buat migration file di `imuii-server/scripts/migrations/`
- [ ] Create new migration file: `YYYYMMDDHHMMSS_add_showcase_fields.sql`
- [ ] Add migration header comments
- [ ] Plan SQL statements

### Step 6.1.6: Create Migration Script - Add Project Fields
- [ ] Add ALTER TABLE statements untuk projects table:
  - `ALTER TABLE projects ADD COLUMN showcase_title VARCHAR(255);`
  - `ALTER TABLE projects ADD COLUMN showcase_description TEXT;`
  - `ALTER TABLE projects ADD COLUMN team_members JSONB;`
  - `ALTER TABLE projects ADD COLUMN youtube_link VARCHAR(500);`
  - `ALTER TABLE projects ADD COLUMN thumbnail_url VARCHAR(500);`
  - `ALTER TABLE projects ADD COLUMN is_showcased BOOLEAN DEFAULT true;`
  - `ALTER TABLE projects ADD COLUMN tags JSONB;`
- [ ] Add comments untuk each column

### Step 6.1.7: Create Migration Script - Add Portfolio Fields
- [ ] Add ALTER TABLE statements untuk portfolios table:
  - Same columns seperti projects
- [ ] Add comments

### Step 6.1.8: Create Migration Script - Migrate Existing Data
- [ ] Add UPDATE statements untuk migrate existing data:
  - `UPDATE projects SET showcase_title = name WHERE showcase_title IS NULL;`
  - `UPDATE projects SET showcase_description = description WHERE showcase_description IS NULL;`
  - Same untuk portfolios
- [ ] Ensure no data loss

### Step 6.1.9: Create Migration Script - Add Indexes (Optional)
- [ ] Add indexes jika diperlukan:
  - Index on `is_showcased` untuk faster filtering
  - Index on `tags` untuk faster search (GIN index untuk JSONB)
- [ ] Add jika performance critical

### Step 6.1.10: Test Migration Script
- [ ] Test migration di development database:
  - Backup database first
  - Run migration script
  - Verify columns added
  - Verify existing data migrated
  - Verify default values set
- [ ] Fix any issues

### Step 6.1.11: Create Rollback Script (Optional)
- [ ] Create rollback migration:
  - DROP COLUMN statements untuk all new columns
  - Test rollback
- [ ] Keep untuk emergency rollback

---

## ✅ 6.2 Update GORM Models

### Step 6.2.1: Update Project Model - Add Fields
- [ ] Buka `imuii-server/internal/model/project.go`
- [ ] Add new struct fields:
  - `ShowcaseTitle string json:"showcase_title" gorm:"type:varchar(255)"`
  - `ShowcaseDescription string json:"showcase_description" gorm:"type:text"`
  - `TeamMembers datatypes.JSON json:"team_members" gorm:"type:jsonb"`
  - `YouTubeLink string json:"youtube_link" gorm:"type:varchar(500)"`
  - `ThumbnailURL string json:"thumbnail_url" gorm:"type:varchar(500)"`
  - `IsShowcased bool json:"is_showcased" gorm:"default:true"`
  - `Tags datatypes.JSON json:"tags" gorm:"type:jsonb"`
- [ ] Import `gorm.io/datatypes` jika belum ada

### Step 6.2.2: Update Project Model - Add Validation Tags (Optional)
- [ ] Add validation tags jika menggunakan validator:
  - Max length untuk strings
  - URL validation untuk links
- [ ] Add jika validation library digunakan

### Step 6.2.3: Update Portfolio Model - Add Fields
- [ ] Buka `imuii-server/internal/model/portfolio.go`
- [ ] Add same fields seperti Project model
- [ ] Ensure consistent field names dan types

### Step 6.2.4: Update Response Models - ProjectResponse
- [ ] Find ProjectResponse struct (biasanya di `internal/api/response/`)
- [ ] Add new fields ke response struct:
  - Same fields seperti model
- [ ] Ensure JSON tags correct

### Step 6.2.5: Update Response Models - PortfolioResponse
- [ ] Find PortfolioResponse struct
- [ ] Add new fields ke response struct
- [ ] Ensure JSON tags correct

### Step 6.2.6: Test Model - Read/Write
- [ ] Test GORM can read new fields:
  - Query project dengan new fields
  - Verify fields populated
- [ ] Test GORM can write new fields:
  - Create/update project dengan new fields
  - Verify saved correctly
- [ ] Fix any issues

### Step 6.2.7: Test Model - JSON Marshalling
- [ ] Test JSON marshalling:
  - Convert model to JSON
  - Verify all fields included
  - Verify JSON tags correct
- [ ] Test JSON unmarshalling:
  - Parse JSON to model
  - Verify fields populated
- [ ] Fix any issues

---

## ✅ 6.3 Update API Handlers

### Step 6.3.1: Review Project Update Handler
- [ ] Buka `imuii-server/internal/api/handler/project_handler.go`
- [ ] Find `UpdateProject` function
- [ ] Review current implementation
- [ ] Understand request/response structure

### Step 6.3.2: Update Project Update Handler - Accept New Fields
- [ ] Update request struct atau parse body:
  - Accept new fields di request body
  - Handle nullable fields
  - Handle JSON fields (team_members, tags)
- [ ] Update handler logic

### Step 6.3.3: Create Validation Functions - YouTube URL
- [ ] Buat file `imuii-server/internal/utils/validation.go` (jika belum ada)
- [ ] Add function `ValidateYouTubeURL(url string) bool`:
  - Check URL format
  - Check if YouTube domain
  - Support various YouTube URL formats
  - Return true jika valid
- [ ] Export function

### Step 6.3.4: Create Validation Functions - Team Members
- [ ] Add function `ValidateTeamMembers(members interface{}) error`:
  - Check if array
  - Validate each member structure
  - Check required fields (name)
  - Return error jika invalid
- [ ] Export function

### Step 6.3.5: Create Validation Functions - Tags
- [ ] Add function `ValidateTags(tags interface{}) error`:
  - Check if array
  - Validate each tag (string)
  - Check max length
  - Return error jika invalid
- [ ] Export function

### Step 6.3.6: Update Project Update Handler - Add Validation
- [ ] In UpdateProject handler:
  - Validate YouTube URL jika provided
  - Validate team members jika provided
  - Validate tags jika provided
  - Return validation errors jika invalid
- [ ] Test validation

### Step 6.3.7: Update Project Update Handler - Update Logic
- [ ] Update project update logic:
  - Set new fields dari request
  - Handle partial updates (only update provided fields)
  - Save to database
  - Return updated project
- [ ] Test update functionality

### Step 6.3.8: Review Portfolio Update Handler
- [ ] Buka portfolio handler file
- [ ] Find `UpdatePortfolio` function
- [ ] Review current implementation

### Step 6.3.9: Update Portfolio Update Handler
- [ ] Apply same updates seperti Project:
  - Accept new fields
  - Add validation
  - Update logic
- [ ] Test update functionality

### Step 6.3.10: Update Error Responses
- [ ] Ensure validation errors returned dengan detail:
  - Field name
  - Error message
  - HTTP status 400
- [ ] Test error responses

### Step 6.3.11: Test API Endpoints - Update Project
- [ ] Test dengan Postman atau curl:
  - Test update dengan all new fields
  - Test update dengan partial fields
  - Test validation errors
  - Test successful update
- [ ] Verify response data

### Step 6.3.12: Test API Endpoints - Update Portfolio
- [ ] Test dengan Postman atau curl:
  - Same tests seperti project
- [ ] Verify response data

---

## ✅ 6.4 Update Service & Repository Layers

### Step 6.4.1: Review Project Service
- [ ] Buka `imuii-server/internal/service/project_service.go`
- [ ] Find `UpdateProject` function
- [ ] Review current implementation
- [ ] Understand service layer logic

### Step 6.4.2: Update Project Service - UpdateProject Function
- [ ] Update function signature jika perlu
- [ ] Add validation logic:
  - Call validation functions
  - Return error jika validation fails
- [ ] Update project dengan new fields
- [ ] Call repository update
- [ ] Return updated project

### Step 6.4.3: Review Portfolio Service
- [ ] Buka portfolio service file
- [ ] Find `UpdatePortfolio` function
- [ ] Review current implementation

### Step 6.4.4: Update Portfolio Service
- [ ] Apply same updates seperti Project service
- [ ] Test service layer

### Step 6.4.5: Review Project Repository
- [ ] Buka `imuii-server/internal/repository/project_repository.go`
- [ ] Find `Update` function
- [ ] Review current implementation
- [ ] Understand GORM update logic

### Step 6.4.6: Update Project Repository - Verify GORM
- [ ] Verify GORM can save new fields:
  - Test update dengan new fields
  - Check database setelah update
  - Verify all fields saved
- [ ] Fix any issues

### Step 6.4.7: Review Portfolio Repository
- [ ] Buka portfolio repository file
- [ ] Verify GORM working dengan new fields
- [ ] Test update functionality

### Step 6.4.8: Create Helper Functions - Format Team Members
- [ ] Buat helper function `FormatTeamMembers(members interface{}) ([]byte, error)`:
  - Convert to JSON
  - Validate structure
  - Return JSON bytes
- [ ] Add to utils package

### Step 6.4.9: Create Helper Functions - Format Tags
- [ ] Buat helper function `FormatTags(tags interface{}) ([]byte, error)`:
  - Convert to JSON
  - Validate structure
  - Return JSON bytes
- [ ] Add to utils package

### Step 6.4.10: Test Complete Flow
- [ ] Test end-to-end:
  - API request dengan new fields
  - Validation working
  - Service layer processing
  - Repository saving
  - Database updated
  - Response returned
- [ ] Fix any issues

### Step 6.4.11: Update API Documentation
- [ ] Update API documentation:
  - Document new fields di request/response
  - Document validation rules
  - Add examples
- [ ] Update `API_DOCUMENTATION.md` atau similar

---

## 📦 Deliverables Checklist

- [ ] ✅ Migration script created dan tested
- [ ] ✅ Project model updated dengan new fields
- [ ] ✅ Portfolio model updated dengan new fields
- [ ] ✅ Response models updated
- [ ] ✅ GORM read/write tested
- [ ] ✅ JSON marshalling tested
- [ ] ✅ Project update handler updated
- [ ] ✅ Portfolio update handler updated
- [ ] ✅ Validation functions created
- [ ] ✅ Validation working correctly
- [ ] ✅ Project service updated
- [ ] ✅ Portfolio service updated
- [ ] ✅ Repository layer verified
- [ ] ✅ Helper functions created
- [ ] ✅ API endpoints tested
- [ ] ✅ API documentation updated
- [ ] ✅ All changes tested end-to-end

---

## 🎯 Next Phase
Setelah Phase 6 selesai, lanjut ke **Phase 7: UI Enhancements**

