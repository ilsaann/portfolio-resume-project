// BUG: this file has no `export default` component. Next.js requires every
// page.js route file to default-export a component - as written, navigating
// to /projects/janesGuild/member/[slug] will fail to build/render. This is
// currently just planning notes for the member "About Me" page, not a stub
// with a placeholder component - needs a real (even minimal) default export
// before this route is safe to link to from anywhere.
//
// signed in About Me with either generated or member's
// editable components.
// I like the idea of inline editing and auto saving but sometimes
// this can lead to accidental changes... so lets
// so an edit switch for "if owner" render edit switch and if on
// containers become editable.
