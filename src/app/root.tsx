import "./globals.css";

export default function Root({ children }: { children: React.ReactNode; }) {
    return (
        <div lang="en">
            <div>{children}</div>
        </div>
    );
}
