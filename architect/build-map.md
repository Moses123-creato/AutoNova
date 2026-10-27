# AutoNova Build Map

## Decision

Stage one should contain **4 pages** and one homepage project section:

1. Home — `/`
2. Services — `/services`
3. About — `/about`
4. Let's Talk — `/contact`

**Project** is currently a homepage section, not a fifth route. The existing
navigation confirms this with `href="#project"`. Promote it to `/projects` only
when a separate project-page design and content set exists.

The dashboard, authentication, agent showcase, blog, pricing, search, and
newsletter are outside this build.

## Shared Site Structure

Every page should use the same shell:

- Floating liquid-metal navbar with the AutoNova mark.
- Consistent page transition and dark Nova Blue visual language.
- Clear primary action to Let's Talk.
- Responsive layout from desktop to mobile.
- Shared footer with navigation, contact route, and essential brand metadata.
- Orbitron for display headings, Rajdhani for section headings, and Inter for
  body copy.
- Aurora, chrome, beam, and 3D treatments used as purposeful visual systems,
  not decoration without a job.

## Page Plans

### 1. Home — `/`

**Job:** Establish the category, show the product/system in motion, and move a
qualified visitor toward a conversation.

Sections:

1. **Hero / Operating Thesis**
   - Strong statement about building systems that move businesses forward.
   - Short explanation of AutoNova's autonomous platform.
   - Primary `See in Action` CTA and secondary interactive-preview CTA.
   - Aurora/WebGL atmosphere and the current visual identity.
2. **Interactive Product Dock**
   - Tracker, Issues, and Inbox views.
   - Live sync status and task-level interaction.
   - This is the product proof directly below the hero.
3. **Why AutoNova**
   - Autonomous agent dispatch.
   - Unified platform velocity.
   - Enterprise isolation and privacy.
   - Global scale and instant sync.
   - Earth/3D visual anchor and proof metrics.
4. **Project / Case Study Preview**
   - One or more selected systems built by AutoNova.
   - Problem, intervention, and measurable result.
   - Link to the future project route only when that route is approved.
5. **Operating Principles**
   - Clarity first.
   - Modular precision.
   - Autonomous flow.
   - Built to last.
6. **Final Conversion Band**
   - Direct invitation to discuss a business system.
   - Let's Talk CTA.

### 2. Services — `/services`

**Job:** Explain what AutoNova builds and help a visitor identify the right
engagement without turning the page into a generic feature catalogue.

Sections:

1. **Services Hero**
   - A precise statement of the transformation AutoNova delivers.
   - Supporting copy focused on business systems, not vague AI claims.
2. **Service Architecture**
   - Business system design and strategy.
   - Custom web platforms and internal tools.
   - Workflow and process automation.
   - AI agent integration where it creates real leverage.
3. **How Engagements Work**
   - Discover the operating problem.
   - Map the system and priorities.
   - Build the first useful version.
   - Measure, refine, and scale.
4. **Capability Proof**
   - Selected interface, workflow, or system examples.
   - Technical stack and delivery standards only where useful.
5. **Fit and Boundaries**
   - Who AutoNova is best suited to help.
   - What a strong project needs from the client.
6. **Services CTA**
   - Route visitors to Let's Talk with a clear next step.

### 3. About — `/about`

**Job:** Build trust by explaining the point of view, standards, and working
model behind AutoNova.

Sections:

1. **About Hero**
   - AutoNova's position: systems that improve how businesses operate.
2. **Point of View**
   - Why fragmented tools and disconnected workflows create drag.
   - Why the answer is a coherent operating system rather than more software.
3. **Principles**
   - Clarity, precision, autonomy, durability, and measurable outcomes.
4. **Working Model**
   - Collaborative discovery.
   - Fast, deliberate prototyping.
   - Technical execution with transparent decisions.
5. **Trust and Standards**
   - Privacy, reliability, accessibility, maintainability, and responsible use
     of automation.
6. **About CTA**
   - Invite the right visitor into a practical conversation.

### 4. Let's Talk — `/contact`

**Job:** Convert interest into a useful project conversation with minimum
friction and enough context to qualify the request.

Sections:

1. **Contact Hero**
   - A confident invitation to describe the business system that needs to move.
2. **Contact Form**
   - Name.
   - Work email.
   - Company or project.
   - What needs to be built or improved.
   - Budget/timeline context if present in the approved design.
   - Client-side validation and accessible error states.
3. **What Happens Next**
   - Submission review.
   - Initial conversation.
   - Recommended next step.
4. **Contact Details**
   - Approved email or contact channel only.
   - No invented address, social account, or promise.
5. **Submission State**
   - Clear success and failure feedback.
   - Form posts to the server route stub until a delivery provider is chosen.

## Build Order

1. Finish the Home page and its Project section.
2. Build Services from its approved design reference.
3. Build About from its approved design reference.
4. Build Let's Talk and the server-route stub.
5. Add and verify the shared footer across all routes.
6. Revisit Project as `/projects` only after its scope and design are approved.

## Guardrails

- Do not add pages to fill space.
- Do not build the dashboard, auth, or agent showcase in stage one.
- Do not invent final brand positioning, contact details, case-study numbers,
  client names, or delivery-provider behavior.
- A design reference is required before implementing a page. Empty design
  folders mean the page is not ready to build.
- Keep page sections purposeful: each section must explain, prove, or convert.