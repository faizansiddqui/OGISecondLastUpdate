import Link from 'next/link';

const Navigation = () => {
    return (
        <nav>
            <Link href="/">Home</Link>
            <Link href="/profile">Profile</Link>
            <Link href="/chatPage">Chat</Link> {/* Chat Link */}
        </nav>
    );
};

export default Navigation;
