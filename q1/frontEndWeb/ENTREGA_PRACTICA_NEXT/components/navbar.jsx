import Link from 'next/link'


export default function Navbar() {
    return (
        <nav className="navbar py-5 bg-gradient-to-br from-emerald-400 to-teal-400 mb-2
        rounded-lg">
            <ul className='flex flex-wrap justify-around text-xl text-white'>
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li>
                    <Link href="/Admin">Admin</Link>
                </li>
                <li>
                    <Link href="/Comercios">Comercios</Link>
                </li>
                <li>
                    <Link href="/User">User</Link>
                </li>
                <li>
                    <Link href="/Trucos">Trucos</Link>
                </li>
            
            </ul>
        </nav>
    )
}