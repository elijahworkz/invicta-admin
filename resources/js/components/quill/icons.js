// Custom icons for Quill editor toolbar
const Icons = {
    audio: `
        <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="21" cy="16" r="3" />
        </svg>
    `.trim(),
};

// Function to register all custom icons
export function registerIcons(Quill) {
    const icons = Quill.import("ui/icons");
    Object.assign(icons, Icons);
}

export default Icons;
