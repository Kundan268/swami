# 📖 User Stories - Shri Swami Samarth Book Catalog

## 🎯 Project Overview
A bilingual (English/Marathi) book catalog website where users can browse, search, and download spiritual books hosted on Google Drive.

---

## 👤 User Personas

### **Primary Persona: Devotee/Reader**
- Seeks spiritual books in English and Marathi
- Varies in technical literacy (basic to intermediate)
- Wants quick access to PDFs
- Prefers simple, intuitive interface

### **Secondary Persona: Administrator**
- Maintains book catalog
- Updates book metadata
- Adds new books via JSON file

---

## 📋 User Stories

### **Epic 1: Book Discovery & Browsing**

#### **Story 1.1: View All Books**
**As a** visitor  
**I want to** see all available books on the home page  
**So that** I can browse the complete collection

**Acceptance Criteria:**
- ✅ Home page displays all books in a grid layout
- ✅ Books show title, description, and year
- ✅ Responsive grid (1 column on mobile, 2 on tablet, 3 on desktop)
- ✅ Loading state shown while books load
- ✅ Empty state shown if no books available

**Priority:** High  
**Story Points:** 3

---

#### **Story 1.2: View Book Details**
**As a** visitor  
**I want to** see detailed information about a book  
**So that** I can learn more before downloading

**Acceptance Criteria:**
- ✅ Clicking "View Details" opens book detail page
- ✅ Page shows full title, description, and year
- ✅ Language toggle available on details page
- ✅ Back button to return to catalog
- ✅ SEO-friendly metadata for each book

**Priority:** Medium  
**Story Points:** 2

---

### **Epic 2: Search Functionality**

#### **Story 2.1: Search Books by Title**
**As a** visitor  
**I want to** search for books by typing their title  
**So that** I can quickly find specific books

**Acceptance Criteria:**
- ✅ Search bar visible on home page
- ✅ Real-time search as user types
- ✅ Search only matches book titles
- ✅ Language-aware search (searches in active language)
- ✅ Fuzzy search handles typos and partial matches
- ✅ Search results update instantly
- ✅ Empty state shown when no matches found

**Priority:** High  
**Story Points:** 5

**Technical Details:**
- Uses Fuse.js for fuzzy search
- Threshold: 0.2 (high precision)
- Searches only in `title.{language}` field
- Single character minimum match

---

#### **Story 2.2: Clear Search**
**As a** visitor  
**I want to** clear my search query  
**So that** I can see all books again

**Acceptance Criteria:**
- ✅ Clearing search input shows all books
- ✅ Search state resets properly

**Priority:** Low  
**Story Points:** 1

---

### **Epic 3: Language Support**

#### **Story 3.1: Switch Language**
**As a** visitor  
**I want to** switch between English and Marathi  
**So that** I can view content in my preferred language

**Acceptance Criteria:**
- ✅ Language toggle button visible (EN/MR)
- ✅ Clicking toggle switches language instantly
- ✅ All text content updates (titles, descriptions, UI)
- ✅ Search re-runs with new language
- ✅ Language preference saved in localStorage
- ✅ Preference persists across page reloads

**Priority:** High  
**Story Points:** 3

**Technical Details:**
- Language stored in `localStorage` with key `book-catalog-language`
- Default: English ('en')
- All components receive language prop
- Content objects have `en` and `mr` properties

---

#### **Story 3.2: View Book in Preferred Language**
**As a** visitor  
**I want to** see book information in my selected language  
**So that** I can understand the content better

**Acceptance Criteria:**
- ✅ Book titles display in active language
- ✅ Descriptions display in active language
- ✅ Search results show in active language
- ✅ Language persists when navigating between pages

**Priority:** High  
**Story Points:** 2

---

### **Epic 4: Book Access & Download**

#### **Story 4.1: View Book Online**
**As a** visitor  
**I want to** view a book directly in Google Drive viewer  
**So that** I can read it without downloading

**Acceptance Criteria:**
- ✅ "View Book" button on each book card
- ✅ Button opens Google Drive viewer in new tab
- ✅ Opens correct language version if available
- ✅ Works on mobile and desktop

**Priority:** High  
**Story Points:** 2

**Technical Details:**
- URL format: `https://drive.google.com/file/d/{FILE_ID}/view`
- Opens in new tab with `target="_blank"`
- Uses file ID from `translations.{language}` field

---

#### **Story 4.2: Download Book PDF**
**As a** visitor  
**I want to** download a book as a PDF  
**So that** I can read it offline

**Acceptance Criteria:**
- ✅ "Download PDF" button on each book card
- ✅ Button triggers direct download from Google Drive
- ✅ Downloads correct language version
- ✅ Works on mobile and desktop browsers
- ✅ Shows download progress in browser

**Priority:** High  
**Story Points:** 2

**Technical Details:**
- URL format: `https://drive.google.com/uc?export=download&id={FILE_ID}`
- Direct download link, no intermediate pages
- Uses file ID from `translations.{language}` field

---

#### **Story 4.3: Access Book from Details Page**
**As a** visitor  
**I want to** view or download a book from the details page  
**So that** I have multiple access points

**Acceptance Criteria:**
- ✅ "View Book" and "Download PDF" buttons on details page
- ✅ Both buttons work correctly
- ✅ Language version switching available
- ✅ Buttons are prominently displayed

**Priority:** Medium  
**Story Points:** 1

---

### **Epic 5: Visual Experience**

#### **Story 5.1: View Sacred Header**
**As a** visitor  
**I want to** see a beautiful header with sacred imagery  
**So that** I feel the spiritual atmosphere

**Acceptance Criteria:**
- ✅ Header displays sacred image
- ✅ Background image with overlay
- ✅ Bilingual title and subtitle
- ✅ Responsive design
- ✅ Fast loading with optimized images

**Priority:** Medium  
**Story Points:** 3

---

#### **Story 5.2: Responsive Design**
**As a** visitor  
**I want to** use the website on any device  
**So that** I can access books from anywhere

**Acceptance Criteria:**
- ✅ Mobile-first responsive design
- ✅ Touch-friendly buttons on mobile
- ✅ Readable text on all screen sizes
- ✅ Grid layout adapts to screen width
- ✅ No horizontal scrolling

**Priority:** High  
**Story Points:** 3

---

### **Epic 6: Content Management**

#### **Story 6.1: Add New Book (Admin)**
**As an** administrator  
**I want to** add new books to the catalog  
**So that** users can discover new content

**Acceptance Criteria:**
- ✅ Edit `public/data/index.json` file
- ✅ Add new book object with required fields
- ✅ Books appear automatically after deployment/ISR
- ✅ No code changes required
- ✅ Bilingual content supported

**Priority:** High  
**Story Points:** 2

**Technical Details:**
- JSON file structure documented
- ISR revalidates every hour
- Manual deployment triggers immediate update

---

#### **Story 6.2: Update Book Metadata (Admin)**
**As an** administrator  
**I want to** update book information  
**So that** I can correct errors or add details

**Acceptance Criteria:**
- ✅ Edit JSON file to update book fields
- ✅ Changes reflected after deployment/ISR
- ✅ Can update title, description, year, file IDs

**Priority:** Medium  
**Story Points:** 1

---

### **Epic 7: Performance & SEO**

#### **Story 7.1: Fast Page Load**
**As a** visitor  
**I want to** experience fast page loads  
**So that** I don't wait long to browse books

**Acceptance Criteria:**
- ✅ Home page loads in < 2 seconds
- ✅ Images optimized and lazy-loaded
- ✅ Static generation for book pages
- ✅ ISR for automatic updates without rebuild

**Priority:** High  
**Story Points:** 3

**Technical Details:**
- Next.js Image optimization
- Static generation with ISR
- Code splitting automatic
- CDN for static assets

---

#### **Story 7.2: SEO Optimization**
**As a** search engine  
**I want to** index book pages properly  
**So that** users can find books via search

**Acceptance Criteria:**
- ✅ Meta titles for each book
- ✅ Meta descriptions
- ✅ Semantic HTML
- ✅ Proper heading hierarchy
- ✅ Open Graph tags (future)

**Priority:** Medium  
**Story Points:** 2

---

## 🎯 User Journey Map

### **Journey 1: First-Time Visitor Discovers a Book**

1. **Landing** → Visitor arrives at home page
2. **Browse** → Sees all books in grid
3. **Language** → Switches to preferred language (MR/EN)
4. **Search** → Types book title to search
5. **Select** → Clicks on desired book
6. **View** → Clicks "View Book" to read online
7. **Download** → Clicks "Download PDF" for offline reading

**Pain Points Addressed:**
- ✅ Quick access without navigation
- ✅ Language preference remembered
- ✅ Direct links to PDFs

---

### **Journey 2: Returning Visitor Searches for Specific Book**

1. **Return** → Visitor returns to site
2. **Language** → Preference auto-loaded
3. **Search** → Types known book title
4. **Results** → Finds book instantly
5. **Access** → Downloads or views directly

**Pain Points Addressed:**
- ✅ Language preference persistence
- ✅ Fast, accurate search
- ✅ No unnecessary clicks

---

## 📊 Story Prioritization

### **Must Have (MVP)**
- Story 1.1: View All Books
- Story 2.1: Search Books by Title
- Story 3.1: Switch Language
- Story 3.2: View Book in Preferred Language
- Story 4.1: View Book Online
- Story 4.2: Download Book PDF
- Story 5.2: Responsive Design

### **Should Have**
- Story 1.2: View Book Details
- Story 5.1: View Sacred Header
- Story 6.1: Add New Book
- Story 7.1: Fast Page Load

### **Nice to Have**
- Story 2.2: Clear Search
- Story 4.3: Access Book from Details Page
- Story 6.2: Update Book Metadata
- Story 7.2: SEO Optimization

---

## ✅ Completed Stories

All MVP stories have been completed:
- ✅ View All Books
- ✅ Search Books by Title
- ✅ Switch Language
- ✅ View Book in Preferred Language
- ✅ View Book Online
- ✅ Download Book PDF
- ✅ Responsive Design
- ✅ View Sacred Header
- ✅ Fast Page Load

---

## 🔮 Future User Stories

### **Epic 8: Enhanced Features**
- **Story 8.1**: Filter books by year
- **Story 8.2**: Book categories/tags
- **Story 8.3**: Recently viewed books
- **Story 8.4**: Book recommendations
- **Story 8.5**: Dark mode toggle

### **Epic 9: User Accounts**
- **Story 9.1**: User registration
- **Story 9.2**: Favorite books
- **Story 9.3**: Reading history
- **Story 9.4**: Book reviews

### **Epic 10: Advanced Search**
- **Story 10.1**: Search by description
- **Story 10.2**: Search by year range
- **Story 10.3**: Advanced filters
- **Story 10.4**: Search history

---

## 📈 Success Metrics

### **User Engagement**
- Average time on site
- Books viewed per session
- Downloads per day
- Search queries per day

### **Technical Performance**
- Page load time < 2s
- Search response time < 100ms
- Zero JavaScript errors
- 100% mobile responsive

### **Content Management**
- Time to add new book < 5 minutes
- Books update automatically via ISR
- Zero downtime during updates

