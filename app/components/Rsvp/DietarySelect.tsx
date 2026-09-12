"use client";

import {
    useEffect,
    useId,
    useLayoutEffect,
    useRef,
    useState,
    type RefObject,
} from "react";
import gsap from "gsap";
import { DIETARY_RESTRICTIONS } from "../../../constants/dietaryRestrictions";

type DietarySelectProps = {
    value: string;
    onChange: (value: string) => void;
    triggerId: string;
    labelId: string;
    rootRef?: RefObject<HTMLDivElement | null>;
};

const DietarySelect = ({
    value,
    onChange,
    triggerId,
    labelId,
    rootRef,
}: DietarySelectProps) => {
    const listboxId = useId();
    const containerRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLUListElement>(null);
    const [isOpen, setIsOpen] = useState(false);

    const selectedLabel =
        DIETARY_RESTRICTIONS.options.find((option) => option.value === value)
            ?.label ?? DIETARY_RESTRICTIONS.options[0].label;

    const setRootRef = (node: HTMLDivElement | null) => {
        containerRef.current = node;
        if (rootRef) {
            rootRef.current = node;
        }
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    const openMenu = () => {
        setIsOpen(true);
    };

    const toggleMenu = () => {
        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    };

    const selectOption = (optionValue: string) => {
        onChange(optionValue);
        closeMenu();

        if (containerRef.current) {
            gsap.fromTo(
                containerRef.current.querySelector(".rsvp-dietary__trigger"),
                { scale: 0.97 },
                { scale: 1, duration: 0.5, ease: "back.out(2)" },
            );
        }
    };

    useLayoutEffect(() => {
        if (!isOpen || !menuRef.current) {
            return;
        }

        const menu = menuRef.current;
        const options = menu.querySelectorAll(".rsvp-dietary__option");

        gsap.killTweensOf([menu, options]);

        gsap.set(menu, { visibility: "visible" });
        gsap.fromTo(
            menu,
            {
                opacity: 0,
                y: -10,
                scale: 0.96,
                transformOrigin: "top center",
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.42,
                ease: "back.out(1.6)",
            },
        );

        gsap.from(options, {
            opacity: 0,
            y: 8,
            duration: 0.38,
            stagger: 0.045,
            ease: "power2.out",
            delay: 0.06,
        });
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const handlePointerDown = (event: MouseEvent) => {
            if (!containerRef.current?.contains(event.target as Node)) {
                closeMenu();
            }
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                closeMenu();
            }
        };

        document.addEventListener("mousedown", handlePointerDown);
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("mousedown", handlePointerDown);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen]);

    return (
        <div
            ref={setRootRef}
            className={`rsvp-dietary__select-wrap${isOpen ? " rsvp-dietary__select-wrap--open" : ""}`}
        >
            <button
                type="button"
                id={triggerId}
                className="rsvp-dietary__trigger"
                aria-labelledby={labelId}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                aria-controls={listboxId}
                onClick={toggleMenu}
            >
                <span className="rsvp-dietary__trigger-label">{selectedLabel}</span>
                <span className="rsvp-dietary__chevron" aria-hidden="true" />
            </button>

            {isOpen ? (
                <ul
                    ref={menuRef}
                    id={listboxId}
                    role="listbox"
                    aria-labelledby={labelId}
                    className="rsvp-dietary__menu"
                >
                    {DIETARY_RESTRICTIONS.options.map((option) => {
                        const isSelected = option.value === value;

                        return (
                            <li key={option.value} role="presentation">
                                <button
                                    type="button"
                                    role="option"
                                    aria-selected={isSelected}
                                    className={`rsvp-dietary__option${isSelected ? " rsvp-dietary__option--selected" : ""}`}
                                    onClick={() => selectOption(option.value)}
                                >
                                    {option.label}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            ) : null}
        </div>
    );
};

export default DietarySelect;
